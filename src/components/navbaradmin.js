import React, { useContext } from "react";
import Logo from "../assets/logo.png";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import Logout from "../assets/logout.png";
import Product from "../assets/product.png";
import Topping from "../assets//topping.png";
import { DataProfil } from "../datadummy/dataprofil";
import Triangle from "../assets/triangle.svg";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/usercontext";
import ProductList from "../assets/productlist.png";
import ToppingList from "../assets/toppinglist.png";

function NavbarAdmin() {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(Usercontext);

  const handleLogout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const handleAddProduct = () => {
    navigate("/addProduct");
  };
  const handleAddTopping = () => {
    navigate("/addTopping");
  };
  const handleProduct = () => {
    navigate("/productadmin");
  };
  const handleHome = () => {
    navigate("/admin");
  };
  const handleToppings = () => {
    navigate("/toppings");
  };

  return (
    <div>
      <div>
        <Container className="">
          <Navbar className="mt-5 d-flex justify-content-between ">
            <Nav className="">
              <img
                onClick={handleHome}
                style={{ width: "70px" }}
                src={Logo}
                alt=""
              />
            </Nav>
            <Nav className="">
              <div>
                <div>
                  {DataProfil.map((item, index) => {
                    return (
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="none"
                          id="dropdown-basic"
                          style={{ border: "none" }}
                        >
                          <img
                            className="profilAccount ms-4"
                            src={item.photo}
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                          style={{
                            boxShadow: "0px 2px 12px",
                          }}
                        >
                          <img
                            src={Triangle}
                            alt=""
                            style={{
                              position: "absolute",
                              width: "25px",
                              top: "-17px",
                              right: "25px",
                              dropShadow: "0 0 4px",
                            }}
                          />
                          <Dropdown.Item onClick={handleAddProduct}>
                            <img
                              src={Product}
                              style={{ width: "50px" }}
                              alt=""
                              className="me-1"
                            />
                            Add Product
                          </Dropdown.Item>
                          <br />
                          <Dropdown.Item onClick={handleAddTopping}>
                            <img
                              src={Topping}
                              style={{ width: "50px" }}
                              alt=""
                              className="me-1"
                            />
                            Add Topping
                          </Dropdown.Item>
                          <hr />
                          <Dropdown.Item onClick={handleProduct}>
                            <img
                              src={ProductList}
                              style={{ width: "50px" }}
                              alt=""
                              className="me-1"
                            />
                            Product List
                          </Dropdown.Item>
                          <br />
                          <Dropdown.Item onClick={handleToppings}>
                            <img
                              src={ToppingList}
                              style={{ width: "50px" }}
                              alt=""
                              className="me-1"
                            />
                            Topping List
                          </Dropdown.Item>
                          <hr />
                          <Dropdown.Item onClick={handleLogout}>
                            <img src={Logout} alt="" className="ms-2 me-1" />
                            Log Out
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    );
                  })}
                </div>
              </div>
            </Nav>
          </Navbar>
        </Container>
      </div>
    </div>
  );
}

export default NavbarAdmin;
