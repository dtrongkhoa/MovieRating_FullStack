import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div>
        <Link to="/users">Users</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/movies">Movies</Link>
      </div>
    </div>
  );
}

export default Navbar;
