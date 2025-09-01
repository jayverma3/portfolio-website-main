import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../../assets/dragon.png";
import { motion } from "framer-motion";

const NavLink = ({ sectionId, children, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.li className="nav-item-v2" whileHover={{ scale: 1.1 }}>
      <a href={`#${sectionId}`} onClick={handleClick}>
        {children}
      </a>
    </motion.li>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <motion.header
      className={`header-container-v2 ${isScrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="header-content-v2">
        <a href="#home" className="logo-link-v2">
          <img src={logo} alt="ACE Logo" className="logo-image-v2" />
        </a>

        <div className="hamburger-menu-v2" onClick={toggleMenu}>
          <div className={`line ${isMenuOpen ? "line1-open" : ""}`}></div>
          <div className={`line ${isMenuOpen ? "line2-open" : ""}`}></div>
          <div className={`line ${isMenuOpen ? "line3-open" : ""}`}></div>
        </div>

        <nav className={`nav-v2 ${isMenuOpen ? "is-open" : ""}`}>
          <ul className="nav-list-v2">
            <NavLink sectionId="about" onClick={closeMenu}>About</NavLink>
            <NavLink sectionId="contact" onClick={closeMenu}>Contact</NavLink>
            <motion.li whileHover={{ scale: 1.1 }}>
              <a href="#contact" className="hire-me-btn" onClick={closeMenu}>
                Hire Me
              </a>
            </motion.li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;