import React, { useContext } from "react";
import bucket from "../assets/cart.png";
import Logo from "../assets/logo.png";
import { Container, Navbar, Nav, Dropdown, Col, Row } from "react-bootstrap";
import { DataProfil } from "../datadummy/dataprofil";
import Logout from "../assets/logout.png";
import User from "../assets/user.png";
import Triangle from "../assets/triangle.svg";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/usercontext";

function NavbarUser({ show }) {
  const navigate = useNavigate();

  const [state, dispatch] = useContext(Usercontext);

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div>
        <Container className="">
          <Navbar className="mt-5 d-flex justify-content-between">
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
                  <img onClick={handleCart} src={bucket} />
                  <span
                    className="badge rounded-pill bg-danger"
                    style={{
                      position: "absolute",
                      top: "15px",
                      right: "120px",
                    }}
                  >
                    {show}
                  </span>

                  {DataProfil.map((item, index) => {
                    return (
                      <span>
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
                            <Dropdown.Item onClick={handleProfile}>
                              <img src={User} alt="" className="me-1" />
                              Profile
                            </Dropdown.Item>
                            <hr />
                            <Dropdown.Item onClick={handleLogout}>
                              <img src={Logout} alt="" className="ms-2 me-1" />
                              Log Out
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </span>
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

export default NavbarUser;
