import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", gap: "20px", background: "#333", padding: "10px" }}>
      <Link to="/home" style={{ color: "white", textDecoration: "none" }}>Home</Link>
      <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</Link>
      <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
    </nav>
  );
};

export default Navbar;
