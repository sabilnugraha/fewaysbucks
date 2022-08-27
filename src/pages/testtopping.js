import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Image from "../assets/FotoDetail.png";
import NavbarAdmin from "../components/navbaradmin";
import Pin from "../assets/pin.png";
import { useState } from "react";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

function Testtopping() {
  const [preview, setPreview] = useState(null); //For image preview
  let navigate = useNavigate();

  const [form, setForm] = useState({
    image: "",
    title: "",
    price: "",
  }); //Store product data

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

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
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("price", form.price);

      // Configuration

      // Insert product data
      const response = await API.post("/topping", formData, config);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  });
  console.log(form);

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
                Topping
              </h1>
              <form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Col>
                  <input
                    className="mb-5 pt-2 pb-2 ps-1"
                    type="text"
                    name="title"
                    placeholder="Name Topping"
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
                    htmlFor="file"
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
                    id="file"
                    onChange={handleChange}
                    placeholder="Photo Product"
                    name="image"
                    hidden
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
                    Add Topping
                  </button>
                </Col>
              </form>
            </Col>
            <Col md={5}>
              {preview && (
                <img
                  src={preview}
                  alt=""
                  style={{ width: "100%", borderRadius: "5px" }}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Testtopping;
