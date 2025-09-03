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
import InfoCard from "../../components/InfoCard/InfoCard";
import ContactCard from "../../components/ContactCard/ContactCard";
import ArrowToTop from "../../components/ArrowToTop/ArrowToTop";
import Journey from "../../components/Journeydiv/Journeydiv";
import Upcomingcomponent from "../../components/Upcomingcomponent/Upcomingcomponent";
import WorkTable from "../../components/WorkTable/WorkTable";
import ScrollingWords from "../../components/ScrollingWords/ScrollingWords";
import SocialShowcase from "../../components/SocialShowcase/SocialShowcase";
import InteractiveTree from "../../components/InteractiveTree/InteractiveTree";
import Section from "../../components/Section/Section";

import picRound from "../../assets/img1.jpg";

// Full Stack Meteor Images
import css3 from "../../assets/logos_pngs/css3.png";
import html5 from "../../assets/logos_pngs/html.png";
import reactlogo from "../../assets/logos_pngs/react.png";
import mongodblogo from "../../assets/logos_pngs/mongodb.png";
import vitelogo from "../../assets/logos_pngs/Vite.js.png";
import expresslogo from "../../assets/logos_pngs/Express.png";
import nextjslogo from "../../assets/logos_pngs/Next.js.png";
import PHP from "../../assets/logos_pngs/PHP.png";
import mysql from "../../assets/logos_pngs/mysql.png";
import python from "../../assets/logos_pngs/python.png";

// Bug Bounty Meteor Images
import john from "../../assets/logos_pngs/tool-logo-john.png";
import aircrack from "../../assets/logos_pngs/tool-logo-aircrack-ng.png";
import metasploit from "../../assets/logos_pngs/tool-logo-metasploit.png";
import wireshark from "../../assets/logos_pngs/tool-logo-wireshark.png";
import nmap from "../../assets/logos_pngs/tool-logo-nmap.png";
import burpsuite from "../../assets/logos_pngs/tool-logo-burp.png";
import sqlmap from "../../assets/logos_pngs/tool-logo-sqlmap.png";
import ffuf from "../../assets/logos_pngs/tool-logo-ffuf.png";
import starkiller from "../../assets/logos_pngs/tool-logo-starkiller.png";
import hydra from "../../assets/logos_pngs/tool-logo-hydra.png";
import responder from "../../assets/logos_pngs/tool-logo-responder.png";
import netexec from "../../assets/logos_pngs/tool-logo-netexec.png";
import powershellempire from "../../assets/logos_pngs/tool-logo-powershell-empire.png";

const fullStackMeteorImages = [
  css3,
  html5,
  reactlogo,
  mongodblogo,
  vitelogo,
  expresslogo,
  nextjslogo,
  PHP,
  mysql,
  python,
];

const bugBountyMeteorImages = [
  john,
  aircrack,
  metasploit,
  wireshark,
  nmap,
  burpsuite,
  sqlmap,
  ffuf,
  starkiller,
  hydra,
  responder,
  netexec,
  powershellempire,
];

const fullStackData = {
  image: picRound,
  intro:
    "I'm a full stack developer with a passion for building efficient, scalable, and user-centric digital products. With experience spanning both front-end and back-end technologies, I specialize in turning ideas into responsive, high-performing web applications.",
  sections: [
    {
      title: "Tech Stack Expertise:",
      items: [
        "Frontend: React, Next.js, Vue, HTML5, CSS3, Tailwind, Sass, TypeScript, Framer Motion",
        "Backend: Node.js, Express, Python (FastAPI/Django), PHP (Laravel), Java, REST & GraphQL APIs",
        "Database: MongoDB, PostgreSQL, MySQL, Firebase, Redis",
        "DevOps & Tools: Docker, Git, CI/CD, Nginx, AWS, Vercel, Netlify",
        "Others: WebSockets, JWT Auth, OAuth, Third-party APIs, CMS integration (Sanity, Strapi, WordPress)",
      ],
    },
    {
      title: "What I Do:",
      items: [
        "Design and develop full-stack web applications from concept to deployment",
        "Create clean, maintainable, and reusable code with performance in mind",
        "Build responsive UIs and intuitive user experiences",
        "Integrate secure APIs and manage server-side logic",
        "Collaborate with cross-functional teams to meet business goals",
      ],
    },
    {
      title: "Highlights:",
      items: [
        "Built and deployed [XX+] full-stack applications (SaaS tools, dashboards, eCommerce platforms, blogs, etc.)",
        "Contributed to open-source projects and custom dev tools",
        "Always experimenting with the latest tech to stay ahead of the curve",
      ],
    },
    {
      title: "Portfolio Includes:",
      items: [
        "Live demos, source code, and GitHub repositories",
        "Dev blog posts and documentation",
        "Component libraries and reusable modules",
      ],
    },
  ],
  concludingText:
    "Always learning, always debugging — with a goal of building a safer digital world.",
  meteorImages: fullStackMeteorImages,
};

const bugBountyData = {
  image: picRound,
  title: "Bug Bounty",
  intro:
    "I’m a security researcher and ethical hacker focused on identifying and responsibly disclosing vulnerabilities in web applications, APIs, and network infrastructures. My work spans across various bug bounty platforms, where I’ve helped improve the security of companies ranging from startups to Fortune 500 organizations.",
  sections: [
    {
      title: "Core Areas of Focus:",
      items: [
        "Web & Application Security (OWASP Top 10)",
        "API Vulnerabilities & Misconfigurations",
        "Authentication/Authorization Bypasses",
        "Reconnaissance & OSINT",
        "Business Logic Flaws",
      ],
    },
    {
      title: "Key Highlights:",
      items: [
        "Developed custom tools and automation for recon, fuzzing, and exploit chains.",
        "Built and maintained custom recon and automation frameworks.",
        "Leveraged OSINT to uncover unintentional data exposures and shadow assets.",
        "Discovered complex logic flaws and privilege escalation chains.",
      ],
    },
    {
      title: "Portfolio Includes:",
      items: [
        "Writeups (public disclosures and redacted reports)",
        "PoC videos and custom tooling demos",
        "Vulnerability chaining scenarios and case studies",
      ],
    },
  ],
  concludingText:
    "Always learning, always debugging — with a goal of building a safer digital world.",
  meteorImages: bugBountyMeteorImages,
};

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
            <SlideIn mainText="My Expertise" />
            <div className="info-cards-container">
              <InfoCard {...fullStackData} />
              <InfoCard {...bugBountyData} />
            </div>
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
