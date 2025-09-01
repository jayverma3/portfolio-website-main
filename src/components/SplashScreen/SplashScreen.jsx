import React, { useEffect, useState } from "react";
import "./SplashScreen.css";
import splashVideo from "../../assets/vid_folder/bluewaves.mp4";

const SplashScreen = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 4500); // Start fade-out animation at 4.5 seconds

    const hideTimer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // Completely hide after 5 seconds

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {showSplash ? (
        <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
          <video autoPlay muted loop playsInline className="splash-video">
            <source src={splashVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h1 className="splash-text">Upgrading</h1>
        </div>
      ) : (
        <div className="site-content">{children}</div>
      )}
    </>
  );
};

export default SplashScreen;
