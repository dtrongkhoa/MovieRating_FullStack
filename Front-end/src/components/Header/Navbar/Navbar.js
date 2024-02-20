import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar(props) {
  const user = props.user;
  var username = "";
  if (user !== null) {
    username = user.username;
  }
  const handleLogout = (e) => {
    "e.preventDefault();";
    props.logoutUser();
  };

  return (
    <div className="navbar">
      <div>
        <Link to="/">Home</Link>
      </div>
      {username === "" ? (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      ) : (
        <div>
          <div>
            <span className="">Welcome, {username}</span>
          </div>
          <Link to="/profile">Profile</Link>
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
