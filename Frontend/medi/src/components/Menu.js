import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css"; // Import your CSS file

const Menu = () => {
  return (
    <div>
      <div className="medi-connect">Medi-Connect</div>
      <div className="menu-container">
        <div className="quote-box">
          "Finding the best medicine is as important as finding the best doctor."
        </div>
        <ul className="menu-list">
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
