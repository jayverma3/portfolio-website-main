import React, { useEffect, useRef } from "react";
import "./Upcomingcomponent.css";
import hacker from "../../assets/gptimages/hoodie_shop.webp";
import reactlogo from "../../assets/logos_pngs/react.png";
import mongodblogo from "../../assets/logos_pngs/mongodb.png";
import htmllogo from "../../assets/logos_pngs/html.png";
import csslogo from "../../assets/logos_pngs/css3.png";
import vitelogo from "../../assets/logos_pngs/Vite.js.png";
import expresslogo from "../../assets/logos_pngs/Express.png";
import nextjslogo from "../../assets/logos_pngs/Next.js.png";
import PHP from "../../assets/logos_pngs/PHP.png";

const techStack = [
  { logo: reactlogo, name: "React" },
  { logo: mongodblogo, name: "MongoDB" },
  { logo: htmllogo, name: "HTML5" },
  { logo: csslogo, name: "CSS" },
  { logo: vitelogo, name: "Vite" },
  { logo: expresslogo, name: "Express" },
  { logo: nextjslogo, name: "Next.js" },
  { logo: PHP, name: "PHP" },
];

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="info-icon"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const Upcomingcomponent = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div className="upcoming-container-v2">
      <div className="upcoming-card-v2" ref={cardRef}>
        <div className="uc-image-container-v2">
          <img src={hacker} alt="Hoodie Project" className="uc-image-v2" />
        </div>
        <div className="uc-content-v2">
          <h3 className="uc-title-v2">Upcoming Project: Hoodiez</h3>
          <div className="uc-section-v2">
            <h4 className="uc-section-title-v2">
              <InfoIcon />
              About The Project
            </h4>
            <p>
              Welcome to Hoodiez, your ultimate destination for premium hoodies and t-shirts that redefine style, comfort, and individuality. Our collection is designed for trendsetters and creatives who value high-quality craftsmanship, timeless designs, and an eco-friendly approach to fashion.
            </p>
          </div>
          <div className="uc-section-v2">
            <h4 className="uc-section-title-v2">
              <InfoIcon />
              Tech Stack
            </h4>
            <ul className="uc-features-list-v2">
              <li>React, Vite, HTML & CSS for the frontend.</li>
              <li>Express.js for the backend framework.</li>
              <li>PHP as a middleware to send data to MongoDB.</li>
              <li>MongoDB for the database.</li>
              <li>3D models of hoodies and t-shirts.</li>
              <li>Secure and smooth checkout process.</li>
            </ul>
          </div>
          <div className="uc-tech-badges-v2">
            {techStack.map(({ logo, name }, index) => (
              <div className="uc-tech-badge-v2" key={index}>
                <img src={logo} alt={`${name} Logo`} className="uc-tech-logo-v2" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upcomingcomponent;