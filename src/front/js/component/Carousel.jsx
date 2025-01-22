import React, { useState, useEffect } from "react";
import GameCard from "./GameCard.jsx";

const Carousel = () => {
  const [videogames, setVideogames] = useState([]);
  const [error, setError] = useState(null);

  const fetchVideogames = () => {
    fetch(process.env.BACKEND_URL + "/admin/videogames",)
      .then((response) => {
        console.log(response)
        if (!response.ok) throw new Error("Error al obtener los datos");
        return response.json();
      })
      .then((data) => setVideogames(data))
      .catch((err) => {
        console.error(err);
        setError("No se pudo cargar la información de los videojuegos.");
      });
  };

  useEffect(() => {
    fetchVideogames();
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (<div
    id="carouselExampleIndicators"
    className="carousel slide"
    data-bs-ride="carousel"
  >
    <div className="carousel-indicators">
      {videogames.map((_, index) => (
        <button
          key={index}
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to={index}
          className={index === 0 ? "active" : ""}
          aria-current={index === 0 ? "true" : undefined}
          aria-label={`Slide ${index + 1}`}
        ></button>
      ))}
    </div>
    <div className="carousel-inner">
      {videogames.map((game, index) => (
        <div
          key={game.id}
          className={`carousel-item ${index === 0 ? "active" : ""}`}
        >
          <GameCard titulo={game.title} imagen={game.image} />
        </div>
      ))}
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
);
};
export default Carousel;

