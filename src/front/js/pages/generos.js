import React from "react";
import "../../styles/generos.css";
// import { Link } from "react-router-dom";
import CardGen from "../component/Generos.jsx";
import "../../styles/SocialCard.css";

const Generos = () => {
  return (
    <div className="text-center mb-4">
        <h1>Categorias</h1>
      <CardGen />
    </div>
  );
};

export default Generos;