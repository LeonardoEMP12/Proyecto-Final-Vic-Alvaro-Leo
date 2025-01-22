import React from 'react';
import "../../styles/GameCard.css";

const GameCard = ({ titulo, imagen }) => {
  return (
    <div id='CardJuego' className="card border-warning mb-3">
      <div className="card-header">{titulo}hola texto 1</div>
      <div className="card-body text-warning">
        <p className="card-text">{imagen}imagen del juego</p>
      </div>
    </div>
  );
};

export default GameCard;