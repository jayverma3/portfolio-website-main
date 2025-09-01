import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./Home.css";
import Cookies from "js-cookie";
import ImageAndName from "../../components/imageandname/imageandname";
import SlideIn from "../../components/SlideIn/SlideIn";
import LineScroller from "../../components/LineScroller/LineScroller";
import backgroundvid from "../../assets/vid_folder/cosmos.mp4";
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import BugBountyDiv from "../../components/MeteorDiv/BugBountyDiv";
import FullStackDiv from "../../components/FullStackDiv/FullStackDiv";
import ContactCard from "../../components/ContactCard/ContactCard";
import ArrowToTop from "../../components/ArrowToTop/ArrowToTop";
import Journey from "../../components/Journeydiv/Journeydiv";
import Upcomingcomponent from "../../components/Upcomingcomponent/Upcomingcomponent";
import WorkTable from "../../components/WorkTable/WorkTable";
import ScrollingWords from "../../components/ScrollingWords/ScrollingWords";
import SocialShowcase from "../../components/SocialShowcase/SocialShowcase";
import InteractiveTree from "../../components/InteractiveTree/InteractiveTree";
import Section from "../../components/Section/Section";

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashShown = Cookies.get("splashShown");
    if (splashShown) {
      setShowSplash(false);
    } else {
      Cookies.set("splashShown", "true", { expires: 7 });
      const timer = setTimeout(() => setShowSplash(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="home-v2">
      {showSplash && <SplashScreen />}
      <video autoPlay muted loop playsInline className="home-background-video-v2">
        <source src={backgroundvid} type="video/mp4" />
      </video>
      <Header />
      <main className="main-content-v2">
        {!showSplash && <LineScroller />}
        <Section>
          <ImageAndName startAnimation={!showSplash} />
        </Section>
        <div id="about">
          <Section>
            <SlideIn mainText="My Journey" subText="Transforming Code into Reality" />
            <Journey />
          </Section>
          <Section>
            <SlideIn mainText="Full Stack Developer" />
            <FullStackDiv />
          </Section>
          <Section>
            <SlideIn mainText="Bug Bounty Profile" />
            <BugBountyDiv />
          </Section>
        </div>
        <Section fullWidth>
          <WorkTable />
        </Section>
        <Section fullWidth>
          <InteractiveTree />
        </Section>
        <Section fullWidth>
          <SocialShowcase />
        </Section>
        <Section>
          <Upcomingcomponent />
        </Section>
        <Section fullWidth>
          <ScrollingWords />
        </Section>
        <div id="contact">
          <Section fullWidth>
            <ContactCard />
          </Section>
        </div>
      </main>
      <ArrowToTop />
      <Footer />
    </div>
  );
};

export default Home;