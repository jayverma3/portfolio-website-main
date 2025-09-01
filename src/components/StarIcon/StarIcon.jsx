import React from "react";
import "./StarIcon.css";

const S = ({ size = 24, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`star-icon ${className}`}
      aria-hidden="true"
    >
      <path d="M12 2L14.8 8.6L22 9.3L17 14.1L18.3 21.2L12 17.8L5.7 21.2L7 14.1L2 9.3L9.2 8.6L12 2Z" />
    </svg>
  );
};

export default S;
