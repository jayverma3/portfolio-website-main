import React, { useEffect } from "react";
import "./SlidingHeaders.css";

const SlidingHeaders = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible"); // Add animation class
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    const headers = document.querySelectorAll(".sliding-header");
    headers.forEach((header) => observer.observe(header));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="header-container">
      <h1 className="sliding-header slide-from-left">
        Full-Stack Developer | Ethical Hacker
      </h1>
      <h2 className="sliding-header slide-from-right">
        Crafting Code, Breaking Security
      </h2>
    </div>
  );
};

export default SlidingHeaders;
