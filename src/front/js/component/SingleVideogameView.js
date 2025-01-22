// SingleVideogameView.js
import React from 'react';
import VideogameCard from './VideogameCard';

const SingleVideogameView = () => {
  const videogame = {
    title: 'Cyberpunk 2077',
    image: 'https://res.cloudinary.com/dqlsbhfxs/image/upload/v1737472418/images_1_gx2las.jpg',
    rating: 7,
    genre: 'RPG',
    developers: ['CD Projekt Red'],
    platforms: ['PC', 'PS5', 'Xbox'],
    tags: ['Sci-Fi', 'Open World'],
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
      <VideogameCard
        title={videogame.title}
        image={videogame.image}
        rating={videogame.rating}
        genre={videogame.genre}
        developers={videogame.developers}
        platforms={videogame.platforms}
        tags={videogame.tags}
      />
    </div>
  );
};

export default SingleVideogameView;
