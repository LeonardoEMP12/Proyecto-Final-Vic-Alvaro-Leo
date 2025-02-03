import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

const FavGenreComponent = () => {
  const { store } = useContext(Context);
  const [genres, setGenres] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const API_URL = process.env.BACKEND_URL + "/api/genres";
  const userId = store.userId;

  // Fetch para obtener todos los géneros disponibles
  const fetchGenres = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setGenres(data.message);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Fetch para obtener los géneros favoritos del usuario
  const fetchFavoriteGenres = async () => {
    try {
      const response = await fetch(process.env.BACKEND_URL + `/api/favorites-genres/${userId}`);
      const data = await response.json();
      if (data.message.favorite_genres) {
        const favoriteIds = data.message.favorite_genres.map(genre => genre.id);
        setFavoriteGenres(favoriteIds);
      }
    } catch (error) {
      console.error("Error fetching favorite genres:", error);
    }
  };

  // Llamar a ambos fetchs al montar el componente
  useEffect(() => {
    fetchGenres();
    if (userId) {
      fetchFavoriteGenres();
    }
  }, [userId]);

  // Función para agregar género a favoritos
  const handleAddToFavorites = async (id) => {
    const url = process.env.BACKEND_URL + "/api/register-genres";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          genre_id: id,
        }),
      });

      if (response.ok) {
        setFavoriteGenres((prev) => [...prev, id]); // Añadir el género a la lista de favoritos
        console.log("Género añadido a favoritos");
      } else {
        console.error("Error al añadir a favoritos:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud", error);
    }
  };

  return (
    <div className="container">
      <div className="row g-4">
        {genres.map((genre) => (
          <div className="col-md-3" key={genre.id}>
            <div
              className={`card card-border ${favoriteGenres.includes(genre.id) ? "favorite" : ""}`}
              onClick={() => handleAddToFavorites(genre.id)}
            >
              <img
                src={`${genre.image}`}
                className="card-img-top"
                alt={`imagen de ${genre.name}`}
              />
              <div className="card-body">
                <h5 className="card-title">{genre.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavGenreComponent;