import React from "react";
import "./Header.css";
import Navbar from "./Navbar";

function Header() {
  return (
    <div>
      <div className="header">
        <h1>Admin Dashboard</h1>
      </div>
      <Navbar />
    </div>
  );
}

export default Header;
