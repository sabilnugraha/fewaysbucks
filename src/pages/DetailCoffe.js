import React, { useState, useEffect } from "react";
import NavbarUser from "../components/navbar";
import { Products } from "../datadummy/dataProduct";
import { Topping } from "../datadummy/Topping";
import { Container, Col, Row, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import convertRupiah from "rupiah-format";
import { API } from "../config/api";

export default function DetailCoffe() {
  const [toppings, setToppings] = useState([]);
  const toppping = async () => {
    const response = await API.get("/toppings");
  };
  console.log(toppping);
  const getTopping = async () => {
    try {
      const response = await API.get("/toppings");
      setToppings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  );
  useEffect(() => {
    getTopping();
  }, []);
  console.log(checkedState);
  const [total, setTotal] = useState(0);

  const [addCart, seatAddCart] = useState(0);
  console.log(addCart);

  const id = useParams();

  const [DetailProduct] = useState(Products);
  const index = id.id - 1;

  const response = DetailProduct[index];

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + Topping[index].toppingPrice;
        }
        return sum;
      },
      0
    );
    console.log(totalPrice);
    setTotal(totalPrice);
  };

  return (
    <div>
      <NavbarUser />
      <Container className="pe-5 ps-5" style={{ margin: "3% 9% 9% 9%" }}>
        <Row className="">
          <Col md={5}>
            <img style={{ width: "100%" }} src={response?.image} />;
          </Col>

          <Col md={7}>
            <Row>
              <Col md={12} className="mt-3">
                <div>
                  <h2 className="textBrown">{response?.name}</h2>
                  <h4> {response?.price} </h4>
                </div>
              </Col>
              <Col md={12} className="mt-5">
                <h4>Topping</h4>
                <Row>
                  {Topping.map((item, index) => {
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
                                  checked={checkedState[index]}
                                  onChange={() => handleOnChange(index)}
                                />
                                <label htmlFor={`custom-checkbox-${index}`}>
                                  <img
                                    style={{ width: "100%" }}
                                    src={item.topping}
                                  />
                                </label>
                              </div>
                              <div className="right-section">
                                {item.toppingName}
                              </div>
                            </div>
                          </li>
                        </ul>
                      </Col>
                    );
                  })}
                </Row>
                <Row className="mt-3">
                  <Col xs={6} md={6}>
                    <div>
                      <h5>Total</h5>
                    </div>
                  </Col>
                  <Col xs={6} md={6}>
                    <div>
                      <h5>{response?.price + total}</h5>
                    </div>
                  </Col>
                </Row>
                <Col xs={12} md={12}>
                  <button
                    style={{ width: "100%" }}
                    onClick={() => seatAddCart(addCart + 1)}
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
