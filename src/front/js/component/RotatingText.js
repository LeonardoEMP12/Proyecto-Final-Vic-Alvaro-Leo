import React, { useState, useEffect } from "react";
import "../../styles/rotatingtext.css";

const RotatingText = ({
  phrases = ["Welcome", "To", "Our", "Website"],
  rotationSpeed = 2000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    setLetters(phrases[currentIndex].split("")); // Divide la palabra en letras
  }, [currentIndex, phrases]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, rotationSpeed);

    return () => clearInterval(interval);
  }, [phrases.length, rotationSpeed]);

  return (
    <div className="rotating-text-container">
      <div className="rotating-text">
        {letters.map((letter, index) => (
          <span key={index} className="letter" style={{ animationDelay: `${index * 0.1}s` }}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RotatingText;