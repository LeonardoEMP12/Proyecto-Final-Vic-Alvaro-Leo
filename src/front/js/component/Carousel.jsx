import React, { useState, useEffect } from "react";
import GameCard from "./GameCard.jsx";
import "../../styles/Carousel.css";



const Carousel = () => {
  const [videogames, setVideogames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const visibleGames = 3; // Cantidad de juegos visibles al mismo tiempo

  const fetchVideogames = () => {
    fetch(process.env.BACKEND_URL + "/api/videogame")
      .then((response) => response.json())
      .then((response) => setVideogames(response.message))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchVideogames();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + visibleGames >= videogames.length ? 0 : prevIndex + visibleGames
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - visibleGames < 0
        ? videogames.length - (videogames.length % visibleGames || visibleGames)
        : prevIndex - visibleGames
    );
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="carousel-container">
  <button onClick={prevSlide} className="carousel-button prev">
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 7l-5 5 5 5V7z" />
    </svg>
  </button>

  <div className="carousel-content d-flex w-100">
    {videogames.slice(currentIndex, currentIndex + visibleGames).map((videogame, index) => (
      <div key={videogame.id || index} className="game-item col-12 col-md-4 col-lg-3">
        <GameCard title={videogame.title} image={videogame.image} id={videogame.id} />
      </div>
    ))}
  </div>

  <button onClick={nextSlide} className="carousel-button next">
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 17l5-5-5-5v10z" />
    </svg>
  </button>
</div>

  );
};

export default Carousel;
