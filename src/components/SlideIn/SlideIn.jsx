import React, { useEffect, useRef, useState } from "react";
import "./SlideIn.css";
import back from "../../assets/vid_folder/purplewaves.mp4";
const SlideIn = ({ mainText, subText }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Trigger animation when 50% of the component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="slidein-background">
      <div
        className={`slide-in-container ${isVisible ? "visible" : ""}`}
        ref={containerRef}
      >
        <h1 className={`slide-in-h1 ${isVisible ? "visible" : ""}`}>
          {mainText}
        </h1>
        <h2 className={`slide-in-h2 ${isVisible ? "visible" : ""}`}>
          {subText}
        </h2>
      </div>
    </div>
  );
};

export default SlideIn;
