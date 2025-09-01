import React, { useEffect, useState } from "react";
import "./ImagesPopUp.css";
import john from "../../assets/logos_pngs/tool-logo-john.png";
import aircrack from "../../assets/logos_pngs/tool-logo-aircrack-ng.png";
import metasploit from "../../assets/logos_pngs/tool-logo-metasploit.png";
import wireshark from "../../assets/logos_pngs/tool-logo-wireshark.png";
import nmap from "../../assets/logos_pngs/tool-logo-nmap.png";
import burpsuite from "../../assets/logos_pngs/tool-logo-burp.png";
import sqlmap from "../../assets/logos_pngs/tool-logo-sqlmap.png";

const imageSources = [
  john,
  aircrack,
  metasploit,
  wireshark,
  nmap,
  burpsuite,
  sqlmap,
];

const generateRandomPositions = (count) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    let top, left;
    let overlap;
    do {
      overlap = false;
      top = Math.floor(Math.random() * 60) + 20; // Random % for top (20% - 80%)
      left = Math.floor(Math.random() * 40) + 30; // Random % for left (30% - 70%)

      // Check if the new position overlaps with existing ones
      for (let pos of positions) {
        if (
          Math.abs(pos.top - top) < 15 && // Ensure a gap of 15% vertically
          Math.abs(pos.left - left) < 15 // Ensure a gap of 15% horizontally
        ) {
          overlap = true;
          break;
        }
      }
    } while (overlap);

    positions.push({
      top,
      left,
      zIndex: i, // Assign increasing z-index for layering
    });
  }
  return positions;
};

const ImagesPopUp = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setPositions(generateRandomPositions(imageSources.length));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) {
            target.style.transform = `translateX(${target.dataset.leftOffset}%)`;
            target.style.opacity = "1";
          } else {
            target.style.transform = "translateX(-150px)";
            target.style.opacity = "0";
          }
        });
      },
      { threshold: 0.2 }
    );

    const imageElements = document.querySelectorAll(".animated-image");
    imageElements.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="image-container">
      {imageSources.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Animated ${idx + 1}`}
          className="animated-image"
          data-left-offset={positions[idx]?.left || 50}
          style={{
            top: `${positions[idx]?.top || 50}%`,
            left: "-150px",
            zIndex: positions[idx]?.zIndex || 0, // Ensure layering
          }}
        />
      ))}
    </div>
  );
};

export default ImagesPopUp;
