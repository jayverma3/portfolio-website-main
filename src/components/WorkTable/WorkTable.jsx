import React, { useState, useEffect } from 'react';
import './WorkTable.css';
import workData from '../../data/workData.json';
import ImageSlider from '../ImageSlider/ImageSlider';

import WebsiteIcon from '../../assets/logos_pngs/website-icon.svg';
import ErpIcon from '../../assets/logos_pngs/erp-icon.svg';
import PersonalIcon from '../../assets/logos_pngs/personal-icon.svg';

const ICONS = {
  "website-icon.svg": WebsiteIcon,
  "erp-icon.svg": ErpIcon,
  "personal-icon.svg": PersonalIcon,
};

const WorkTable = () => {
  const [activeCategory, setActiveCategory] = useState(workData[0].category);
  const [activeSubcategory, setActiveSubcategory] = useState(workData[0].subcategories[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCategoryClick = (category) => {
    if (activeCategory !== category.category) {
      setIsAnimating(true);
      setActiveCategory(category.category);
      setActiveSubcategory(category.subcategories[0]);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    if (activeSubcategory.id !== subcategory.id) {
      setIsAnimating(true);
      setActiveSubcategory(subcategory);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500); // Corresponds to animation duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const renderIcon = (iconName) => {
    const iconSrc = ICONS[iconName];
    return iconSrc ? <img src={iconSrc} alt={`${iconName} icon`} /> : null;
  }

  return (
    <div className="work-table-container">
      <div className="work-table">
        <div className="left-panel">
          <ul>
            {workData.map((category) => (
              <li key={category.category}>
                <button
                  className={`category-btn ${activeCategory === category.category ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                  aria-pressed={activeCategory === category.category}
                >
                  <span className="category-icon">{renderIcon(category.icon)}</span>
                  {category.category}
                </button>
                {activeCategory === category.category && (
                  <ul className="subcategory-list">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory.id}>
                        <button
                          className={`subcategory-btn ${activeSubcategory.id === subcategory.id ? 'active' : ''}`}
                          onClick={() => handleSubcategoryClick(subcategory)}
                          aria-pressed={activeSubcategory.id === subcategory.id}
                        >
                          {subcategory.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="right-panel">
          {!isAnimating && (
            <div className="right-panel-content">
              <div className="media-container">
                <ImageSlider images={activeSubcategory.imageUrls} />
              </div>
              <div className="work-details">
                <h2>{activeSubcategory.title}</h2>
                <p className="description">{activeSubcategory.description}</p>
                <ul className="features-list">
                  {activeSubcategory.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <a href={activeSubcategory.projectLink} className="project-link-btn" target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkTable;
