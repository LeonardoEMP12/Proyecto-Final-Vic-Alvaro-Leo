import React from "react";
import "../../styles/generos.css";
import { Link } from "react-router-dom";
import CardGen from "../component/Generos.jsx";
import SocialCard from "../component/SocialCard.jsx";
import "../../styles/SocialCard.css";

const Generos = () => {
  return (
    <div className="text-center mb-4">
        <h1>Categorias</h1>
      <CardGen />
      <SocialCard
        image="https://sm.ign.com/t/ign_es/screenshot/default/wallpapersden_rasy.1280.jpg"
        title="Publicación de ejemplo"
        description="Esta es una descripción breve de la publicación. ¡Perfecta para redes sociales!"
        likes={120}
        comments={15}
      />
    </div>
  );
};

export default Generos;