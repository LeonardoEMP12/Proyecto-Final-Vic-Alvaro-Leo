import React from "react";
import "../../styles/CartaFavoritos.css"

const CartaFavoritosGeneros = ({ title, id}) => {
  const user = localStorage.getItem("userId");

  const eliminarGenero = () => {
    fetch(process.env.BACKEND_URL + `api/remove-genres`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_id": user,
        "genre_id": id,
      })
    })
  }
  return (
    <div id="CardJuego" className="card text-center justify-content-center">
      <div id="TituloGame" className="card-header"><h4>{title}</h4></div>
      <div ontouchstart="">
        <div className="button mb-5">
          <button onClick={() => {eliminarGenero()}}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default CartaFavoritosGeneros;
