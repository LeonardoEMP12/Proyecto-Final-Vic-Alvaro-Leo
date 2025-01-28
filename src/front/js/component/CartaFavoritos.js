import React from "react";
import "../../styles/CartaFavoritos.css"

const CartaFavoritos = ({ title, id}) => {
  const user = localStorage.getItem("userId");

  const eliminarJuego = () => {
    fetch(process.env.BACKEND_URL + `api/remove-games`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_id": user,
        "videogame_id": id,
      })
    })
  }
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
      <div id="TituloGame" className="card-header">{title}</div>
      <button id="BotonEliminarJuego" onClick={()=>{eliminarJuego(), eliminarGenero()}}>X</button>
    </div>
  );
};

export default CartaFavoritos;
