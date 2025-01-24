import React from "react";
import "../../styles/GameCard.css";

const GameCard = ({ image, title }) => {
  return (
    <div id="CardJuego" className="card border-warning mb-3">
      <div className="card-header">{title}</div>
      <div id="Carta" className="card-body">
        <img src={image} alt={title} className="img-fluid" />
      </div>
    </div>
  );
};

export default GameCard;
