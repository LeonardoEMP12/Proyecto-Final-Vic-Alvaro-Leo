import React from 'react';

const CardFavGenre = ({ name, description, image_background, id }) => {
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
            height: '150px', // Ajusta según tus necesidades
            objectFit: 'cover', // Evita distorsión de la imagen
          }}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text text-black">{description}</p>
          <button
            className="btn btn-primary mt-3 btn-green"
            onClick={() => {
              
              

            }}
          >
            Añadir a favoritos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFavGenre;
