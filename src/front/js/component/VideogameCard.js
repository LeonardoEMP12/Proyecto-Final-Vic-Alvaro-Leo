// VideogameCard.js
import React from 'react';
import "../../styles/videogamecard.css";

const VideogameCard = ({ title, image, rating, genre, developers, platforms, tags }) => {
  return (
    <div className="videogame-card row d-flex align-items-center">
      <div className="image-section col-md-4">
        <img src={image} alt={title} className="img-fluid rounded" />
      </div>
      <div className="details-section col-md-8 text-end">
        <div style={{ color: '#fff' }}>
          <h2><span style={{ color: '#ffd200' }}>{title}</span></h2>
          <p><strong>Genre:</strong> <span style={{ color: '#ffd200' }}>{genre}</span></p>
          <p><strong>Developers:</strong> <span style={{ color: '#ffd200' }}>{developers.join(', ')}</span></p>
          <p><strong>Platforms:</strong> <span style={{ color: '#ffd200' }}>{platforms.join(', ')}</span></p>
          <p><strong>Tags:</strong> <span style={{ color: '#ffd200' }}>{tags.join(', ')}</span></p>
        </div>
        <div style={{ color: '#fff' }}>
          <p className="rating fw-bold fs-5">Rating: <span style={{ color: '#ffd200' }}>{rating}</span></p>
        </div>
      </div>
    </div>
  );
};

export default VideogameCard;
