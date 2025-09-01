import React from 'react';
import './ScrollingWords.css';

const words = [
  'React', 'JavaScript', 'Node.js', 'Express', 'MongoDB', 'CSS3', 'HTML5', 'Python', 'TypeScript', 'Next.js', 'Vite', 'PHP', 'MySQL'
];

const ScrollingWords = () => {
  const extendedWords = [...words, ...words, ...words]; // Duplicate words for seamless looping

  return (
    <div className="scrolling-words-container">
      <div className="scrolling-words-track">
        {extendedWords.map((word, index) => (
          <div className="word" key={index}>
            <span className="word-text">{word}</span>
            <span className="word-separator">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingWords;
