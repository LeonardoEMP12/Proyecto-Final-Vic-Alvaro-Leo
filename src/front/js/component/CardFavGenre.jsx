import React from 'react';

const CardFavGenre = ({ name, description, image_background, id }) => {

  const handleAddToFavorites = async () => {
    const url = 'https://congenial-train-wr97pxj7gvvph6j9-3001.app.github.dev/api/register-genres';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 2,
          genre_id: 4
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Juego añadido a favoritos:', data);
      } else {
        alert('Error al añadir a favoritos:', response.statusText);
      }
    } catch (error) {
      alert('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <div
        className="card"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <img
          src={`${image_background}`}
          className="card-img-top"
          alt={`${name} image`}
          style={{
            height: '150px', 
            objectFit: 'cover'
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <button
            className="btn btn-green"
            onClick={handleAddToFavorites}
          >
            Añadir a favoritos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFavGenre;
