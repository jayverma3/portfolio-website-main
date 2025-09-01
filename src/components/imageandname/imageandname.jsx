import React, { useEffect, useState } from "react";
import "./imageandname.css";
import picRound from "../../assets/picround.png";
import whiteline from "../../assets/whiteblock.png";
import rocket from "../../assets/logos_pngs/rocket_pngs.png";

const ImageAndName = ({ startAnimation }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (startAnimation) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 2500); // Wait for rocket to finish
      return () => clearTimeout(timer);
    }
  }, [startAnimation]);

  return (
    <div className="image-and-name-container">
      {startAnimation && !showContent && (
        <img src={rocket} alt="Rocket" className="rocket-image" />
      )}

      {startAnimation && showContent && (
        <>
          <img src={picRound} alt="Round" className="round-image" />
          <img src={whiteline} alt="White Line" className="white-line" />
          <h2 className="iandnclass">
            &lt;Welcome/&gt;
            <br />
          </h2>
        </>
      )}
    </div>
  );
};

export default ImageAndName;
