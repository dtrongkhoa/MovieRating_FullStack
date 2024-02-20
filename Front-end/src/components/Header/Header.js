import React from "react";
import Navbar from "./Navbar/Navbar";
import "./Header.css";

function Header(props) {
  const user = props.user;
  return (
    <div>
      <div className="header">
        <h1>Loop Cinemas</h1>
      </div>
      <Navbar user={user} logoutUser={props.logoutUser} />
    </div>
  );
}

export default Header;