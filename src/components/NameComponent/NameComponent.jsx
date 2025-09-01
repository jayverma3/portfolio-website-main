import React from "react";
import "./NameComponent.css";
import { motion } from "framer-motion";

const NameComponent = () => {
  return (
    <div className="name-component">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="role"
      >
        <span className="text full-stack">Full Stack Developer</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="slash"
      >
        /
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
        className="role"
      >
        <span className="text penetration-tester">Penetration Tester</span>
      </motion.div>
    </div>
  );
};

export default NameComponent;
