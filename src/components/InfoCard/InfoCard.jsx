import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./InfoCard.css";
import P from "../PinkIcon/PinkIcon";

const InfoCard = ({
  image,
  title,
  intro,
  sections,
  meteorImages,
  concludingText,
}) => {
  const containerRef = useRef();
  const [startAnimation, setStartAnimation] = useState(false);
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setRotate({ x: -y * 15, y: x * 15 });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (inView) {
      setStartAnimation(true);
      controls.start("visible");
    }
  }, [controls, inView]);

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
  }, [startAnimation, meteorImages]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="ic-meteor-container" ref={containerRef}>
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate={controls}
        className="ic-floating-div"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <img src={image} alt="Profile" className="ic-image" />
        {title && <h1 className="ic-h1">{title}</h1>}
        <div className="ic-divider"></div>
        {intro && <p className="ic-p">{intro}</p>}

        {sections.map((section, index) => (
          <div key={index}>
            <div className="ic-divider"></div>
            <p className="ic-p">
              <strong>{section.title}</strong>
            </p>
            <ul className="ic-ul">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="ic-li">
                  <P /> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="ic-divider"></div>
        <p className="ic-p">{concludingText}</p>
      </motion.div>
    </div>
  );
};

export default InfoCard;
