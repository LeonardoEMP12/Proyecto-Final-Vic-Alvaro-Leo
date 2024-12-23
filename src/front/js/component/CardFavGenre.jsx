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
          genre_id: id, // Ahora utiliza el id dinámico
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
    <div
      className="card card-border"
      onClick={handleAddToFavorites} // Toda la tarjeta es clickeable
    >
      <img
        src={`${image_background}`}
        className="card-img-top"
        alt={`imagen de ${name}`}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default CardFavGenre;
