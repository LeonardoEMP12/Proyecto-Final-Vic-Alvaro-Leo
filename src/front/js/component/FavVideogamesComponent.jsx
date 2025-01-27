import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../store/appContext";

const FavVideogameComponent = () => {
  const { store } = useContext(Context);
  const [videogames, setVideogames] = useState([]);
  const API_URL = process.env.BACKEND_URL + "/api/videogames";

  const userId = store.userId;

  const fetchVideogames = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Agregar `isFavorite` como false inicialmente
      const videogamesWithFavorites = data.message.map((videogame) => ({
        ...videogame,
        isFavorite: false,
      }));

      setVideogames(videogamesWithFavorites);
    } catch (error) {
      console.error("Error fetching videogames:", error);
    }
  };

  useEffect(() => {
    fetchVideogames();
  }, []);

  const handleAddToFavorites = async (id) => {
    const url = process.env.BACKEND_URL + "/api/register-videogames";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          videogame_id: id,
        }),
      });

      if (response.ok) {
        console.log("Videojuego añadido a favoritos");

        // Alternar el estado de isFavorite en el videojuego correspondiente
        setVideogames((prevVideogames) =>
          prevVideogames.map((videogame) =>
            videogame.id === id ? { ...videogame, isFavorite: !videogame.isFavorite } : videogame
          )
        );
      } else {
        console.error("Error al añadir a favoritos:", response.statusText);
      }
    } catch (error) {
      alert("Error en la solicitud", error);
    }
  };

  return (
    <div className="container">
      <div className="row g-4">
        {videogames.map((videogame) => (
          <div
            className={`col-md-3 ${videogame.isFavorite ? "favorite-card" : ""}`} // Agregar clase condicional
            key={videogame.id}
          >
            <div
              className="card card-border"
              onClick={() => handleAddToFavorites(videogame.id)}
            >
              <img
                src={`${videogame.image}`}
                className="card-img-top"
                alt={`imagen de ${videogame.name}`}
              />
              <div className="card-body">
                <h5 className="card-title">{videogame.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavVideogameComponent;