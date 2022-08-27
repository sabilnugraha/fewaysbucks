import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "../landingPages.css";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../context/usercontext";
import LoginAuth from "./auth/login";
import RegisterAuth from "./auth/register";

export default function AuthModal() {
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  function SwitchLogin() {
    setShow(false);
    setShowRegister(true);
  }
  function SwitchRegister() {
    setShowRegister(false);
    setShow(true);
  }

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Button
        className="buttonLogin"
        style={{ color: "red", backgroundColor: "white", borderColor: "red" }}
        onClick={handleShow}
      >
        Login
      </Button>
      <Button
        className="buttonRegister"
        style={{ color: "white", backgroundColor: "red", borderColor: "red" }}
        onClick={handleShowRegister}
      >
        Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div className="m-4">
          <Modal.Title>
            <h1 className="mb-4">Login</h1>
          </Modal.Title>
          <LoginAuth />

          <p className="mt-4" style={{ color: "black" }}>
            Don't have an account ? click{" "}
            <a onClick={SwitchLogin} style={{ cursor: "pointer" }}>
              <b>Here</b>
            </a>
          </p>
        </div>
      </Modal>

      <Modal show={showRegister} onHide={handleCloseRegister}>
        <div className="m-4">
          <Modal.Title>
            <h1 className="mb-4">Register</h1>
          </Modal.Title>
          <RegisterAuth />

          <p className="mt-4" style={{ color: "black" }}>
            Already have an account? click{" "}
            <a onClick={SwitchRegister} style={{ cursor: "pointer" }}>
              <b>Here</b>
            </a>
          </p>
        </div>
      </Modal>
    </>
  );
}
