import React, { useEffect, useState } from 'react';

const FavGenreComponent = () => {
  const [genres, setGenres] = useState([]);
  const API_KEY = '02f82a6de2d04510bf98339e6e960f2c';
  const API_URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;

  const fetchGenres = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setGenres(data.results); // Guardamos solo el array de "results"
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleAddToFavorites = async (id) => {
    const url = process.env.BACKEND_URL + "/api/register-genres";

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1,
          genre_id: id
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Juego añadido a favoritos:', data);
      } else {
        alert('Error al añadir a favoritos:', response.statusText);
      }
    } catch (error) {
      alert('Error en la solicitud', error);
    }
  };

  return (
    <div className="container">
      <div className="row g-4">
        {genres.map((genre) => (
          <div className="col-md-3" key={genre.id}>
            <div
              className="card card-border"
              onClick={() => handleAddToFavorites(genre.id)}
            >
              <img
                src={`${genre.image_background}`}
                className="card-img-top"
                alt={`imagen de ${genre.name}`}
              />
              <div className="card-body">
                <h5 className="card-title">{genre.name}</h5>
                <p className="card-text">{genre.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavGenreComponent;
