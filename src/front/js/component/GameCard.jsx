import React from "react";
import "../../styles/GameCard.css";

const GameCard = ({ imagen, titulo }) => {
  return (
    <div id="CardJuego" className="card border-warning mb-3">
      <div className="card-header">{titulo}</div>
      <div className="card-body text-warning">
        <img src={imagen} alt={titulo} className="img-fluid" />
      </div>
    </div>
  );
};

export default GameCard;
