// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="fcopyright">
          <p>&copy; 2025 Jay Verma. All rights reserved.</p>
        </div>
        <div className="details">
          <div className="finfo">
            <p>𖠿 Address: Ahmedabad 380028</p>
            <p>☏ Call Me: 820-093-2601</p>
            <p>⌯⌲ Email Me: Jayverma200105@gmail.com</p>
          </div>
          <div className="line"></div>
          <div className="froute">
            <p>
              <Link to="/about">About Me</Link>
            </p>
            <p>
              <Link to="/contact">Contact Me</Link>
            </p>
            <p>
              <Link to="/regis">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
