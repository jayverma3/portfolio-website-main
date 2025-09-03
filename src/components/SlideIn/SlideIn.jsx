import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./SlideIn.css";

const SlideIn = ({ mainText, subText }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: [0.6, 0.05, -0.01, 0.9],
        delay: 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="slide-in-container-v2"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.h1 className="slide-in-main-text" variants={itemVariants}>
        {mainText}
      </motion.h1>
      {subText && (
        <motion.h2 className="slide-in-sub-text" variants={itemVariants}>
          {subText}
        </motion.h2>
      )}
      <motion.div
        className="divider-line"
        variants={lineVariants}
        style={{ transformOrigin: "center" }}
      />
    </motion.div>
  );
};

export default SlideIn;
