import React, { useState, useEffect } from "react";
import GameCard from "./GameCard.jsx";
import "../../styles/Carousel.css";


const CarouselAction = () => {
  const [videogames, setVideogames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const visibleGames = 6; // Cantidad de juegos visibles al mismo tiempo

  const fetchVideogames = () => {
    fetch(process.env.BACKEND_URL + "/api/videogame")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los videojuegos");
        }
        return response.json();
      })
      .then((response) => {
        // Filtrar los videojuegos que tengan el género "acción"
        const filteredGames = response.message.filter(
          (game) => game.genre && game.genre.toLowerCase() === "accion"
        );
        setVideogames(filteredGames); // Actualizar con los videojuegos filtrados
      })
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
        Prev
      </button>
      <div className="carousel-content">
        {videogames.slice(currentIndex, currentIndex + visibleGames).map((videogame, index) => (
          <div key={videogame.id || index} className="game-item">
            <GameCard title={videogame.title} image={videogame.image} />
          </div>
        ))}
      </div>
      <button onClick={nextSlide} className="carousel-button next">
        Next
      </button>
    </div>
  );
};

export default CarouselAction;
