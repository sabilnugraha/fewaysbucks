import React from "react";
import { useState, useContext } from "react";
import { Usercontext } from "../../context/usercontext";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/api";

function LoginAuth() {
  const [state, dispatch] = useContext(Usercontext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const Navigate = useNavigate();

  console.log(state);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Data body

      // Configuration
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const Body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", Body, config);

      console.log(response.data.data);

      // Checking process
      if (response?.status == 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });

        // Status check
        if (response.data.data.status == "admin") {
          Navigate("/admin");
        } else {
          Navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  console.log(state.isLogin);

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            style={{ borderColor: "red" }}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            style={{ borderColor: "red" }}
            autoFocus
          />
        </Form.Group>

        <Button type="submit" style={{ width: "100%", backgroundColor: "red" }}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginAuth;
