import React from "react";
import "../../styles/generos.css";
import { Link } from "react-router-dom";
import CardGen from "../component/Generos.jsx";

const Generos = () => {
  return (
    <div>
      <div className="text-center mb-4">
        <h1>Categorias</h1>
      </div>
      <CardGen /> {/* Llama al componente Generos para renderizar las tarjetas */}
    </div>
  );
};

export default Generos;
