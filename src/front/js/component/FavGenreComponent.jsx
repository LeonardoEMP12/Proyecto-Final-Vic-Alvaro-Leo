import React, { useEffect, useState } from 'react';
import CardFavGenre from './CardFavGenre.jsx';

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

  return (
    <div className="container">
      <div className="row g-4">
        {genres.map((genre) => (
          <div className="col-md-3" key={genre.id}>
            <CardFavGenre
              name={genre.name}
              description={genre.id} // De momento uso el id para ver si se traen bien
              image_background={genre.image_background}
              link="#"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavGenreComponent;
