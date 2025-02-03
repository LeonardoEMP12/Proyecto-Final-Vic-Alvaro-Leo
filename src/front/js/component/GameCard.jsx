import React, { useState, useEffect } from 'react';
import "../../styles/GameCard.css";

const GameCard = ({ image, title, api_id, videogameId }) => {
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const user = localStorage.getItem("userId");

  // Verificar si el juego está en favoritos al cargar el componente
  useEffect(() => {
    const fetchFavoriteGames = async () => {
      try {
        const response = await fetch(process.env.BACKEND_URL + `api/favorites-games/${user}`);
        const data = await response.json();
        // Verifica si el juego actual está en la lista de favoritos
        const isFavorite = data.message.favorite_games.some(game => game.id === videogameId);
        setAddedToFavorites(isFavorite);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoriteGames();
  }, [user, videogameId]);

  const addToFavorites = (id) => {
    fetch(process.env.BACKEND_URL + "api/register-games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_id": user,
        "videogame_id": id
      })
    })
      .then((response) => response.json())
      .then(() => setAddedToFavorites(true))
      .catch((error) => console.error(error));
  };

  return (
    <div id="CardJuego" className="mb-3">
      <a
        href={process.env.FRONTEND_URL + `game/${api_id}`}
        rel="noopener noreferrer"
        className="text-decoration-none d-block"
      >
        <div className="card-header text-center">{title}</div>
        <div id="Carta" className="card-body d-flex flex-column align-items-center">
          <img src={image} alt={title} className="img-fluid w-100" />
        </div>
      </a>
      <div className="d-flex justify-content-center">
        <button
          id="FavoritoBoton"
          className={`m-2 btn ${addedToFavorites ? 'added' : ' '}`}
          onClick={() => addToFavorites(videogameId)}
          disabled={addedToFavorites}
        >
          <span>{addedToFavorites ? "Añadido a favoritos" : "Añadir a favoritos"}</span>
        </button>
      </div>
    </div>
  );
};

export default GameCard;