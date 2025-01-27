import React from "react";
import FavGenreComponent from "../component/FavGenreComponent.jsx";
import "../../styles/selectfavgenres.css";
import { Link } from "react-router-dom";

//create your first component
export const SelectFavGenre = () => {
	return (
		<div className="text-center">
			<h1 className="text-white mt-5">Selecciona tus géneros favoritos!</h1>
			<h5 className="text-white mb-5">Esto nos ayudará a mejorar tus recomendaciones</h5>
            <FavGenreComponent />
			<Link className="btn text-white bg-dark m-5" to="/muro">
					Ir al muro
				  </Link>
		</div>
	);
};
