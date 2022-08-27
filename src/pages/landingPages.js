import React, { useState, useContext, useEffect } from "react";
import Logo from "../assets/logo.png";
import Desain from "../assets/Jumbotron.png";
import "../landingPages.css";
import { Container, Col, Row, Card, Navbar, Nav } from "react-bootstrap";
import AuthModal from "../components/AuthModal";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/usercontext";
import NavbarUser from "../components/navbar";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";

function LandingPages() {
  const [state, dispatch] = useContext(Usercontext);

  const navigate = useNavigate();

  const [user, setUser] = React.useContext(Usercontext);

  const [dataproduct, setDataproduct] = useState([]);

  useEffect(() => {
    const dataproduct = async () => {
      try {
        const response = await API.get("/products");
        setDataproduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataproduct();
  }, [setDataproduct]);

  const movetoDetail = (id) => {
    navigate("/product/" + id);
  };

  let subscribe = state.isLogin;
  console.log(subscribe);

  console.log(state);

  return (
    <div>
      <div>
        <Container className="">
          {subscribe ? (
            <NavbarUser />
          ) : (
            <Navbar className="mt-5 d-flex justify-content-between ">
              <Nav className="">
                <img style={{ width: "70px" }} src={Logo} alt="" />
              </Nav>
              <Nav className="">
                <div>
                  <div>
                    <AuthModal />
                  </div>
                </div>
              </Nav>
            </Navbar>
          )}
        </Container>
      </div>
      <div>
        <Container>
          <div className="m-5">
            <img
              style={{ borderRadius: "10px", width: "100%" }}
              src={Desain}
              alt=""
            />
          </div>
          <div className="m-5">
            <div style={{ color: "#BD0707" }}>
              <h1 className="">Let's order</h1>
            </div>
            <div className="d-flex mt-3 justify-content-center">
              {dataproduct.map((item, index) => (
                <Card
                  key={index}
                  className="me-3"
                  style={{
                    width: "18rem",
                    backgroundColor: "#F6DADA",
                    borderRadius: "10px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{ cursor: "pointer" }}
                    onClick={() => movetoDetail(item?.id)}
                  />

                  <Card.Body>
                    <Card.Title style={{ color: "#BD0707" }}>
                      {item.title}
                    </Card.Title>
                    <Card.Text>{convertRupiah.convert(item?.price)}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default LandingPages;
