import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Journeydiv.css";

const Journeydiv = () => {
  const journeyData = [
    {
      year: "2016-2017",
      education: "Gujarat State Board (GSB), Ahmedabad",
      qualification: "10th Grade",
    },
    {
      year: "2017-2018",
      education: "Gujarat State Board of Higher Secondary Education (GSEB), Ahmedabad",
      qualification: "12th Commerce",
    },
    {
      year: "2018-2022",
      education: "Integrated Masters in Computer Application (IMCA), From RB Shastri College under Gujarat Technology University(GTU), Ahmedabad",
      qualification: "Bachelor's Degree (BCA)",
    },
    {
      year: "2022-2025",
      education: "Integrated Masters in Computer Application (IMCA), From RB Shastri College under Gujarat Technology University(GTU), Ahmedabad",
      qualification: "Master's Degree (MCA)",
    },
    {
      year: "2025 (June - September)",
      education: "Full Stack Developer at Arqadian Group",
      qualification: "Full ERP System, Website Development & Data Analysis",
    },
  ];

  const TimelineItem = ({ item, index }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.5,
    });

    const variants = {
      hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    };

    return (
      <motion.div
        ref={ref}
        className="timeline-item"
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="timeline-content">
          <h3 className="timeline-year">{item.year}</h3>
          <h4 className="timeline-qualification">{item.qualification}</h4>
          <p className="timeline-education">{item.education}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="journey-container-v2">
      {journeyData.map((item, index) => (
        <TimelineItem item={item} index={index} key={index} />
      ))}
    </div>
  );
};

export default Journeydiv;
