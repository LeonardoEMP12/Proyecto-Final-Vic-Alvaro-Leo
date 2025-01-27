import React from "react";
import "../../styles/GameCard.css";

const GameCard = ({ image, title, api_id }) => {
  return (
    <div id="CardJuego" className="mb-3">
      <a
        // cambiar url en momento de produccion
        href={`https://sturdy-goldfish-7vr7w6p9w4qrcrgpj-3000.app.github.dev/game/${api_id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-decoration-none"
      >
        <div className="card-header text-center">{title}</div>
        <div id="Carta" className="card-body justify-content-end">
          <img src={image} alt={title} className="img-fluid" />
        </div>
      </a>
      <div>
        <button id="FavoritoBoton" className="m-2"><span>Añadir a favoritos</span></button>
      </div>
    </div>
  );
};


export default GameCard;
