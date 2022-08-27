import React, { useState, useEffect } from "react";
import NavbarUser from "../components/navbar";
import { Products } from "../datadummy/dataProduct";
import { Topping } from "../datadummy/Topping";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";
import { useMutation } from "react-query";
import { Usercontext } from "../context/usercontext"
import { useContext } from "react";


export default function DetailProduct() {
  const [addCart, setAddCart] = useState(null);
  console.log(addCart);

  const [state] = useContext(Usercontext)
  
  const UserID = state.user.id
  console.log(UserID)

  const [dataproduct, setDataproduct] = useState([]);
  const [datatopping, setDatatoppping] = useState([]);

  const [toppings, setToppings] = useState([]); //Store all category data
  const [toppingId, setToppingId] = useState([]); //Save the selected category id
  const [prices, setPrices] = useState([]); //save te selected price

  const [total, setTotal] = useState(0);
  const [checkedState, setCheckedState] = useState([]);
  const getTopping = async () => {
    try {
      const response = await API.get("/toppings");
      setToppings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toppingprice = new Array(datatopping.fill(false));

  console.log();

  const { id } = useParams();
  console.log(checkedState);
  const index = id;
  const [topping, setTopping] = useState([]);
  const [check, setCheck] = useState(null)
  // console.log(topping);
  // let updateTopping = [...topping];
  //   if (e.target.checked) {
  //     updateTopping = [...topping, e.target.value];
  //   } else {
  //     updateTopping.splice(topping.indexOf(e.target.value));
  //   }
  //   setTopping(updateTopping);

  const handleChangeTopping = (e) => {
    const id = e.target.value;
    const price = e.target.name;
    const checkeds = e.target.checked;

    if (checkeds) {
      // Save category id if checked
      setToppingId([...toppingId, parseInt(id)]);
      setPrices([...prices, parseInt(price)]);
    } else {
      // Delete category id from variable if unchecked
      let newToppingId = toppingId.filter((toppingIdItem) => {
        return toppingIdItem != id;
      });
      setToppingId(newToppingId);
      let newPrices = prices.filter((pricesItem) => {
        return pricesItem != price;
      });
      setPrices(newPrices);
    }
  };

  const sum = prices.reduce((partialsum, a) => partialsum + a, 0);
  console.log(sum);

  // const sum = prices.reduce((prev, next) => prev + next, 0);
  // setTotal(sum);
  // console.log(total);

  console.log("id" + ":" + toppingId);
  console.log("price" + ":" + prices);

  const response = dataproduct;

  useEffect(() => {
    const dataproduct = async () => {
      try {
        const response = await API.get("/product/" + id);

        setDataproduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataproduct();
  }, [setDataproduct]);

  

  useEffect(() => {
    const datatopping = async () => {
      try {
        const response = await API.get("/toppings");
        setDatatoppping(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    datatopping();
  }, [setDatatoppping]);
  

  // const handleOnChange = (position) => {
  //   const updatedCheckedState = checkedState.map((item, index) =>
  //     index === position ? !item : item
  //   );

  //  setCheckedState(updatedCheckedState);

  //
let subtotal= response?.price + sum;

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        Headers: {
          "Content-type": "application/json"
        },
      };
      const body = JSON.stringify({
        Topping_ID: toppingId,
        SubTotal : subtotal,
        Product_ID : parseInt(id),
      })

      const response = await API.post("/cart", body, config);
      console.log(body);
      
      
    } catch (error) {
      console.log(error);
    }
  })

  const idt = toppings.id;
  useEffect(() => {
    getTopping();
  }, []);

  return (
    <div>
      <NavbarUser show={addCart} />
      <Container className="pe-5 ps-5" style={{ margin: "3% 9% 9% 9%" }}>
        <Row className="">
          <Col md={5}>
            <img style={{ width: "100%" }} src={response?.image} />
          </Col>

          <Col md={7}>
            <Row>
              <Col md={12} className="mt-3">
                <div>
                  <h2 style={{ color: "#BD0707" }}>{response?.name}</h2>
                  <h4> {convertRupiah.convert(response?.price)} </h4>
                </div>
              </Col>
              <Col md={12} className="mt-5">
                <h4 style={{ color: "#BD0707" }}>Topping</h4>
                <Row>
                  {toppings.map((item, index) => {
                    return (
                      <Col md={3}>
                        <ul style={{ display: "inline" }}>
                          <li key={index} style={{ listStyleType: "none" }}>
                            <div className="toppings-list-item">
                              <div className="left-section">
                                <input
                                  type="checkbox"
                                  className="poppingCheck"
                                  style={{ display: "none" }}
                                  id={`custom-checkbox-${index}`}
                                  value={item.id}
                                  name={item.price}
                                  onClick={handleChangeTopping}
                                  
                                />
                                <label htmlFor={`custom-checkbox-${index}`}>
                                  <img
                                    className="r"
                                    style={{ width: "100%" }}
                                    src={item.image}
                                  />
                                </label>
                              </div>
                              <div className="right-section">{item.title}</div>
                            </div>
                          </li>
                        </ul>
                      </Col>
                    );
                  })}
                </Row>
                <Row className="mt-5 mb-5 ">
                  <Col xs={6} md={6}>
                    <div>
                      <h5 style={{ color: "#BD0707" }}>Total</h5>
                    </div>
                  </Col>
                  <Col xs={6} md={6}>
                    <div className="d-flex justify-content-end">
                      <h5>{convertRupiah.convert(response?.price + sum)}</h5>
                    </div>
                  </Col>
                </Row>
                <Col xs={12} md={12}>
                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "5px",
                      borderColor: "red",
                    }}
                    onClick={(e) => handleSubmit.mutate(e) }
                  >
                    Add Cart
                  </button>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
