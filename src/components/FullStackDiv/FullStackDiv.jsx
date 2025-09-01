import React, { useEffect, useRef, useState } from "react";
import "./FullStackDiv.css";
import picRound from "../../assets/img1.jpg";
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
import P from "../PinkIcon/PinkIcon";

const meteorImages = [
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

const FullStackDiv = () => {
  const containerRef = useRef();
  const observerRef = useRef();
  const [startAnimation, setStartAnimation] = useState(false);
  const [divVisible, setDivVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
          setDivVisible(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
      observerRef.current = observer;
    }

    return () => {
      if (observerRef.current && containerRef.current) {
        observerRef.current.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!startAnimation) return;

    const container = containerRef.current;

    const createMeteor = () => {
      const meteor = document.createElement("img");
      meteor.src =
        meteorImages[Math.floor(Math.random() * meteorImages.length)];
      meteor.className = "meteor";

      const size = Math.random() * 50 + 60;
      meteor.style.width = `${size}px`;

      const x = Math.random() * container.offsetWidth;
      meteor.style.left = `${x}px`;

      const drift = Math.random() > 0.5 ? 40 : -40;
      meteor.style.setProperty("--drift", `${drift}px`);

      const duration = Math.random() * 5 + 5;
      meteor.style.animationDuration = `${duration}s`;

      container.appendChild(meteor);

      setTimeout(() => {
        if (container.contains(meteor)) {
          container.removeChild(meteor);
        }
      }, duration * 1000 + 1000);
    };

    const interval = setInterval(createMeteor, 400);
    return () => clearInterval(interval);
  }, [startAnimation]);

  return (
    <div className="meteor-container" ref={containerRef}>
      <div className={`floating-div ${divVisible ? "visible" : ""}`}>
        <img src={picRound} alt="Round" className="bb-image" />

        {/* Horizontal line */}
        <div className="bb-divider"></div>

        <p className="ff-p">
          <strong>Check Out My Full Stack Projects</strong> <br />
        </p>

        <p className="ff-p">
          I'm a full stack developer with a passion for building efficient,
          scalable, and user-centric digital products. With experience spanning
          both front-end and back-end technologies, I specialize in turning
          ideas into responsive, high-performing web applications.
        </p>
        <div className="bb-divider"></div>

        <p className="ff-p">
          <br />
          💻 <strong> Tech Stack Expertise:</strong>
        </p>
        <ul className="ff-ul">
          <li className="ff-li">
            <P /> Frontend: React, Next.js, Vue, HTML5, CSS3, Tailwind, Sass,
            TypeScript, Framer Motion
          </li>
          <li className="ff-li">
            <P /> Backend: Node.js, Express, Python (FastAPI/Django), PHP
            (Laravel), Java, REST & GraphQL APIs
          </li>
          <li className="ff-li">
            <P /> Database: MongoDB, PostgreSQL, MySQL, Firebase, Redis
          </li>
          <li className="ff-li">
            <P /> DevOps & Tools: Docker, Git, CI/CD, Nginx, AWS, Vercel,
            Netlify
          </li>
          <li className="ff-li">
            <P /> Others: WebSockets, JWT Auth, OAuth, Third-party APIs, CMS
            integration (Sanity, Strapi, WordPress)
          </li>
        </ul>
        <div className="bb-divider"></div>

        <p className="ff-p">
          <br />
          🌐 <strong>What I Do:</strong>
        </p>
        <ul className="ff-ul">
          <li className="ff-li">
            <P /> Design and develop full-stack web applications from concept to
            deployment
          </li>
          <li className="ff-li">
            <P /> Create clean, maintainable, and reusable code with performance
            in mind
          </li>
          <li className="ff-li">
            <P /> Build responsive UIs and intuitive user experiences
          </li>
          <li className="ff-li">
            <P /> Integrate secure APIs and manage server-side logic
          </li>
          <li className="ff-li">
            <P /> Collaborate with cross-functional teams to meet business goals
          </li>
        </ul>
        <div className="bb-divider"></div>

        <p className="ff-p">
          <br />
          🚀 <strong>Highlights:</strong>
        </p>
        <ul className="ff-ul">
          <li className="ff-li">
            <P /> Built and deployed [XX+] full-stack applications (SaaS tools,
            dashboards, eCommerce platforms, blogs, etc.)
          </li>
          <li className="ff-li">
            <P /> Contributed to open-source projects and custom dev tools
          </li>
          <li className="ff-li">
            <P /> Always experimenting with the latest tech to stay ahead of the
            curve
          </li>
        </ul>
        <div className="bb-divider"></div>

        <p className="ff-p">
          <br />
          📂 <strong>Portfolio Includes:</strong>
        </p>
        <ul className="ff-ul">
          <li className="ff-li">
            <P /> Live demos, source code, and GitHub repositories
          </li>
          <li className="ff-li">
            <P /> Dev blog posts and documentation
          </li>
          <li className="ff-li">
            <P /> Component libraries and reusable modules
          </li>
        </ul>
        <br />
        <div className="bb-divider"></div>

        <p className="ff-p">
          Always learning, always debugging — with a goal of building a safer
          digital world.
        </p>
      </div>
    </div>
  );
};

export default FullStackDiv;
