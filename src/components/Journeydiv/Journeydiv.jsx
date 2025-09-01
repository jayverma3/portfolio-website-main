import React from 'react';
import './Journeydiv.css';

const Journeydiv = () => {
  const journeyData = [
    {
      year: '2023',
      education: 'Self Taught',
      qualification: 'Full Stack Web Development',
    },
    {
      year: '2024',
      education: 'Self Taught',
      qualification: 'Penetration Testing',
    },
    // You can add more journey items here
  ];

  return (
    <div className="journey-container">
      <h2 className="journey-title">My Journey</h2>
      <div className="journey-grid">
        {/* Header Row */}
        <div className="grid-row header">
          <div className="grid-cell">Year</div>
          <div className="grid-cell">Education</div>
          <div className="grid-cell">Qualification</div>
        </div>

        {/* Data Rows */}
        {journeyData.map((item, index) => (
          <div className="grid-row" key={index}>
            <div className="grid-cell" data-label="Year">{item.year}</div>
            <div className="grid-cell" data-label="Education">{item.education}</div>
            <div className="grid-cell" data-label="Qualification">{item.qualification}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journeydiv;