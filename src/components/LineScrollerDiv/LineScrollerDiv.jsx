import React, { useRef, useState, useEffect } from "react";
import "./LineScrollerDiv.css";

const LineScrollerDiv = () => {
  const scrollContainerRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [scrollbarHeight, setScrollbarHeight] = useState(0);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollPercentage =
        container.scrollTop / (container.scrollHeight - container.clientHeight);
      const newHeight = scrollPercentage * 100;

      // Ensure scrollbar trail doesn't shrink when scrolling up
      setLineHeight(newHeight);
      setScrollbarHeight((prev) => (newHeight > prev ? newHeight : prev));
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="mejourney">
      {/* Left-side animated line */}
      <div className="line-scroller-container">
        <div
          className="line-scroller"
          style={{ height: `${lineHeight}%` }}
        ></div>
      </div>

      {/* Scrollable Container */}
      <div className="scroll-container" ref={scrollContainerRef}>
        <div style={{ height: `${scrollbarHeight}%` }}></div>
        <div className="scroll-content"></div>
      </div>
    </div>
  );
};

export default LineScrollerDiv;
