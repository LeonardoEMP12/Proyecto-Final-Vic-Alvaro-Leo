import React from "react";

const CartaFavoritosJuegos = ({ title, id}) => {
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
  
  return (
    <div id="CardJuego" className="card mb-3">
      <div className="card-header">{title}</div>
      <button onClick={()=>{eliminarJuego()}}>X</button>
    </div>
  );
};

export default CartaFavoritosJuegos;
