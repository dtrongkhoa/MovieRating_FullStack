import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password || !form.confirmPassword) {
      setMessage("All fields are required!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        props.loginUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setMessage("Registration successful. You are now logged in.");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        const data = await response.json();
        setMessage(data.message || "Error during registration.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Error during registration.");
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f6fa" }}>
      <div className="container justify-content-center">
        <div className="col-12 col-md-12 row bg-white">
          <div className="col-12">
            <h1 className="my-2">Signup</h1>
          </div>
          <div className="signin-container">
            <form onSubmit={handleSubmit} className="signin-form">
              <input
                type="text"
                name="username"
                placeholder="User Name"
                value={form.username}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleInputChange}
              />
              <button type="submit" className="btn btn-primary col-1">
                Register
              </button>
            </form>
          </div>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
