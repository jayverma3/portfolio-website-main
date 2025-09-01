import React, { useEffect } from "react";
import "./FullStackCompo.css";
import john from "../../assets/logos_pngs/tool-logo-john.png";
import aircrack from "../../assets/logos_pngs/tool-logo-aircrack-ng.png";
import metasploit from "../../assets/logos_pngs/tool-logo-metasploit.png";
import wireshark from "../../assets/logos_pngs/tool-logo-wireshark.png";
import nmap from "../../assets/logos_pngs/tool-logo-nmap.png";
import burpsuite from "../../assets/logos_pngs/tool-logo-burp.png";
import sqlmap from "../../assets/logos_pngs/tool-logo-sqlmap.png";
import reactlogo from "../../assets/logos_pngs/react.png";
const images = [
  { src: john, leftOffset: "30%", translateY: "-20%" },
  { src: aircrack, leftOffset: "40%", translateY: "-25%" },
  { src: metasploit, leftOffset: "50%", translateY: "-30%" },
  { src: wireshark, leftOffset: "60%", translateY: "-15%" },
  { src: nmap, leftOffset: "70%", translateY: "-10%" },
  { src: burpsuite, leftOffset: "80%", translateY: "-5%" },
  { src: sqlmap, leftOffset: "90%", translateY: "0%" },
];
const FullStackCompo = () => {
  return (
    <>
      <div className="fullstack-content"></div>
    </>
  );
};

export default FullStackCompo;
