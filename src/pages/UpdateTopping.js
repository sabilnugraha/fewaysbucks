import React, { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import NavbarAdmin from "../components/navbaradmin";
import Pin from "../assets/pin.png";
import { useState } from "react";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

function UpdateToppping() {
  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data
  const [dataproduct, setDataproduct] = useState([]);
  let navigate = useNavigate();

  const { id } = useParams();

  const [form, setForm] = useState({
    image: "",
    title: "",
    price: "",
  }); //Store product data

  //   let { productRefetch } = useQuery("productCache", async () => {
  //     const response = await API.get("/product/" + id);
  //     setForm({
  //       title: response.data.title,
  //       price: response.data.price,
  //       image: response.data.image,
  //     });
  //     setProduct(response.data);
  //   });
  useEffect(() => {
    const dataproduct = async () => {
      try {
        const response = await API.get("/topping/" + id);
        setForm({
          title: response.data.data.title,

          price: response.data.data.price,

          image: response.data.data.image,
        });

        setDataproduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataproduct();
  }, [setDataproduct]);

  console.log(id);
  console.log(form);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    console.log(form);
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const imagefromdb = form.image;
  console.log(imagefromdb);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();

      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      } else {
        formData.set("image", imagefromdb);
      }
      //  formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("price", form.price);

      // Configuration

      // Insert product data
      const response = await API.patch("/topping/" + dataproduct.id, formData);
      navigate("/toppings");
    } catch (error) {
      console.log(error);
    }
  });

  console.log(preview);

  return (
    <div>
      <div>
        <NavbarAdmin />
      </div>
      <div>
        <Container className="mt-5 mb-5">
          <Row>
            <Col md={7} className="">
              <h1 className="mb-5" style={{ color: "brown" }}>
                Update Topping
              </h1>
              <form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Col>
                  <input
                    className="mb-5 pt-2 pb-2 ps-1"
                    type="text"
                    name="title"
                    id="title"
                    value={form.title}
                    placeholder="Name Product"
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      borderColor: "#BD0707",
                      backgroundColor: "#DCDCDC",
                    }}
                  />
                </Col>
                <Col>
                  <input
                    className="mb-5 pt-2 pb-2 ps-1"
                    type="text"
                    placeholder="Price"
                    name="price"
                    onChange={handleChange}
                    value={form.price}
                    id="price"
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      borderColor: "#BD0707",
                      backgroundColor: "#DCDCDC",
                    }}
                  />
                </Col>
                <Col>
                  <label
                    className="mb-5 pt-2 pb-2 ps-1 pe-1 d-flex justify-content-between align-item-center"
                    htmlFor="image"
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      border: "2px solid #BD0707",
                      color: "#757575",
                      backgroundColor: "#DCDCDC",
                    }}
                  >
                    File
                    <img src={Pin} alt="" />
                  </label>
                  <input
                    className="mb-5 pt-2 pb-2 ps-1"
                    type="file"
                    id="image"
                    onChange={handleChange}
                    placeholder="Photo Product"
                    name="image"
                  />
                </Col>
                <Col className="d-flex justify-content-center">
                  <button
                    className="mb-5 pt-2 pb-2"
                    type="submit"
                    style={{
                      width: "90%",
                      borderRadius: "5px",
                      backgroundColor: "red",
                      color: "white",
                      borderColor: "red",
                    }}
                  >
                    Add Product
                  </button>
                </Col>
              </form>
            </Col>
            <Col md={5}>
              {!preview ? (
                <div>
                  <img
                    src={form.image}
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={preview}
                    style={{ width: "100%", borderRadius: "5px" }}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default UpdateToppping;
