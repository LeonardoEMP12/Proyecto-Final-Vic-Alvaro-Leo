import React, { useState, useEffect } from "react";
import GameCard from "./GameCard.jsx";

const Carousel = () => {
  const [videogames, setVideogames] = useState([]);
  const [error, setError] = useState(null);

  const fetchVideogames = () => {
    fetch(process.env.BACKEND_URL + "/api/videogame")
            .then((response) => response.json())
            .then((response) => setVideogames(response.message))
            .catch((error) => console.error(error));
  };

  useEffect(() => {
    
    fetchVideogames();
    console.log(videogames)
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
  <div className="videogames-list">
  {videogames.map((videogame, index) => (
  <div key={videogame.id || index} className="game-item">
  <GameCard titulo={videogame.title} imagen={videogame.image} />
   </div>
 ))}
 </div>
 
);
};

export default Carousel;

