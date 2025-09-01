import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import backgroundvid from "../../assets/vid_folder/cosmos.mp4";

import "./Contact.css";
import ContactCard from "../../components/ContactCard/ContactCard";
const Contact = () => {
  return (
    <div className="contact">
      <video autoPlay muted loop playsInline className="home-background-video">
        <source src={backgroundvid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Header />
      <ContactCard />
      <Footer />
    </div>
  );
};
export default Contact;
