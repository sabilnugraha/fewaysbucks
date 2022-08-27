import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Image from "../assets/ToppingDetail.png";
import NavbarAdmin from "../components/navbaradmin";
import Pin from "../assets/pin.png";

export default function AddTopping() {
  return (
    <div>
      <div>
        <NavbarAdmin />
      </div>
      <div>
        <Container className="mt-5 mb-5">
          <Row>
            <Col md={7} className="">
              <h1 className="mb-5" style={{ color: "#BD0707" }}>
                Product
              </h1>
              <form action="">
                <Col>
                  <input
                    className="mb-5 pt-2 pb-2 ps-1"
                    type="text"
                    placeholder="Name Topping"
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
                    placeholder="Photo Product"
                    hidden
                  />
                </Col>
                <Col className="d-flex justify-content-center">
                  <button
                    className="mb-5 pt-2 pb-2"
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
              <img src={Image} alt="" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
