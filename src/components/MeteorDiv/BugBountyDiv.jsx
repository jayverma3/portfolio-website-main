import React, { useEffect, useRef, useState } from "react";
import "./BugBountyDiv.css";
import picRound from "../../assets/img1.jpg";
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

import P from "../PinkIcon/PinkIcon";
import S from "../StarIcon/StarIcon";

const meteorImages = [
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

const BugBountyDiv = () => {
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
      { threshold: 0.3 }
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
    <div className="bb-meteor-container" ref={containerRef}>
      <div className={`bb-floating-div ${divVisible ? "bb-visible" : ""}`}>
        <img src={picRound} alt="Round" className="bb-image" />
        <h1 className="bb-h1">Bug Bounty</h1>
        <div className="bb-divider"></div>

        <p className="bb-p">
          <strong>Check Out My Bug Bounty Profile</strong> <br />
        </p>

        <p className="bb-p">
          I’m a security researcher and ethical hacker focused on identifying
          and responsibly disclosing vulnerabilities in web applications, APIs,
          and network infrastructures. My work spans across various bug bounty
          platforms, where I’ve helped improve the security of companies ranging
          from startups to Fortune 500 organizations.
        </p>
        <div className="bb-divider"></div>

        <p className="bb-p">
          🔍 <strong>Core Areas of Focus:</strong>
        </p>
        <ul className="bb-ul">
          <li className="bb-li">
            <P /> Web & Application Security (OWASP Top 10)
          </li>
          <li className="bb-li">
            <P /> API Vulnerabilities & Misconfigurations
          </li>
          <li className="bb-li">
            <P /> Authentication/Authorization Bypasses
          </li>
          <li className="bb-li">
            <P /> Reconnaissance & OSINT
          </li>
          <li className="bb-li">
            <P /> Business Logic Flaws
          </li>
        </ul>
        <div className="bb-divider"></div>

        <p className="bb-p">
          🎯 <strong>Key Highlights:</strong>
        </p>
        <ul className="bb-ul">
          <li className="bb-li">
            <P /> Developed custom tools and automation for recon, fuzzing, and
            exploit chains.
          </li>
          <li className="bb-li">
            <P /> Built and maintained custom recon and automation frameworks.
          </li>
          <li className="bb-li">
            <P /> Leveraged OSINT to uncover unintentional data exposures and
            shadow assets.
          </li>
          <li className="bb-li">
            <P /> Discovered complex logic flaws and privilege escalation
            chains.
          </li>
        </ul>
        <div className="bb-divider"></div>

        <p className="bb-p">
          📂 <strong>Portfolio Includes:</strong>
        </p>
        <ul className="bb-ul">
          <li className="bb-li">
            <P /> Writeups (public disclosures and redacted reports)
          </li>
          <li className="bb-li">
            <P /> PoC videos and custom tooling demos
          </li>
          <li className="bb-li">
            <P /> Vulnerability chaining scenarios and case studies
          </li>
        </ul>
        <div className="bb-divider"></div>

        <p className="bb-p">
          Always learning, always debugging — with a goal of building a safer
          digital world.
        </p>
      </div>
    </div>
  );
};

export default BugBountyDiv;
