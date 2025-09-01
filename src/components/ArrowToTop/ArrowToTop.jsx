import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react"; // Icon library for a clean arrow icon
import "./ArrowToTop.css";

const ArrowToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show/hide the arrow based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`arrow-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp />
    </button>
  );
};

export default ArrowToTop;
