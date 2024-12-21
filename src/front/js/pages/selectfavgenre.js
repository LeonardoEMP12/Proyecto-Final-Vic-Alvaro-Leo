import React from "react";
import FavGenreComponent from "../component/FavGenreComponent.jsx";
import "../../styles/selectfavgenres.css";

//create your first component
export const SelectFavGenre = () => {
	return (
		<div className="text-center">

            <FavGenreComponent />

		</div>
	);
};
