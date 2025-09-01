import "./AboutMe.css";
import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import backgroundvid from "../../assets/vid_folder/cosmos.mp4";
import Journey from "../../components/Journeydiv/Journeydiv";
import LineScroller from "../../components/LineScroller/LineScroller";
import SlideIn from "../../components/SlideIn/SlideIn";
import Upcomingcomponent from "../../components/Upcomingcomponent/Upcomingcomponent";

const AboutMe = () => {
  return (
    <div className="aboutme">
      <LineScroller />

      <video autoPlay muted loop playsInline className="home-background-video">
        <source src={backgroundvid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Header />
      <div className="journey">
        <SlideIn
          mainText="My Journey"
          subText="Transforming Code into Reality"
        />

        <Journey />
      </div>
      <div className="hupc">
        <Upcomingcomponent className="hupc" />
      </div>
      <Footer />
    </div>
  );
};
export default AboutMe;
