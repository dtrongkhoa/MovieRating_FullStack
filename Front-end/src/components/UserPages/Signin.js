import React, { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const Signin = (props) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateInputs = () => {
    if (!form.username || !form.password) {
      setMessage("Both fields are required.");
      return false;
    }
    return true;
  };

  const apiURL = "/api/users/login";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const { username, password } = form;
    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        setMessage(`Welcome ${data.username}!`);
        props.loginUser(data);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred during login.");
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f6fa" }}>
      <div className="container justify-content-center">
        <div className="col-12 col-md-12 row bg-white">
          <div className="col-12">
            <h1 className="my-2">Sign In</h1>
          </div>
          <div className="signin-form">
            <div>
              <label className="text-primary">Username:</label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="text-primary">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">
              Sign In
            </button>
            <button
              onClick={() => (window.location.href = "/signup")}
              className="btn btn-primary"
            >
              Sign Up
            </button>
          </div>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signin;
