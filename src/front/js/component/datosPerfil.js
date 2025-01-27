import React, { useState, useEffect } from "react";
import "../../styles/Carousel.css";
import CartaFavoritos from "./CartaFavoritos.js";



const DatosPerfil = () => {

    const user = localStorage.getItem("userId");
    const [perfil, setPerfil] = useState([]);
    const [genres, setGenres] = useState([]);
    const [games, setGames] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [birth_date, setBirth_date] = useState("");
    const fetchPerfil = () => {
        fetch(process.env.BACKEND_URL + `api/perfil/${user}`)
            .then((response) => response.json())
            .then((response) => {setPerfil(response.profiles)
                setUsuario(response.user)
            })
            .catch((error) => console.error(error));
    };
    const fetchFavoriteGenres = () => {
        fetch(process.env.BACKEND_URL + `api/favorites-genres/${user}`)
            .then((response) => response.json())
            .then((response) => setGenres(response.message.favorite_genres))
            .catch((error) => console.error(error));
    };
    const fetchFavoriteGames = () => {
        fetch(process.env.BACKEND_URL + `api/favorites-games/${user}`)
            .then((response) => response.json())
            .then((response) => setGames(response.message.favorite_games))
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        fetchPerfil();
        fetchFavoriteGames();
        fetchFavoriteGenres();
    }, []);
    const handleUsername = (event) => {
        setText(event.target.value);
    }
    const handleDescription = (event) => {
        setText(event.target.value);
    }
    const handleBirthDate = (event) => {
        setText(event.target.value);
    }

    const putUsername = () => {
        fetch(process.env.BACKEND_URL + `api/profile/${user}/username`, {
            method: "Put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
            })
        })
    }
    const putDescription = () => {
        fetch(process.env.BACKEND_URL + `api/profile/${user}/description`, {
            method: "Put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "description": description,
            })
        })
    }
    const putBirthdate = () => {
        fetch(process.env.BACKEND_URL + `api/profile/${user}/birth_date`, {
            method: "Put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "birth_date": birth_date,
            })
        })
    }

    return (
        <>
            {perfil.map((perfil, index) => {
                return (
                    <div key={index}>
                        <h1 className="mt-5">@{perfil.username}</h1> <button>Editar</button>
                        <p className="mt-3">Correo: {usuario.email}</p>
                        <p>Fecha de nacimiento: {perfil.birth_date}</p>
                        <h3 className="mt-5">Descripcion</h3>
                        <p>{perfil.description}</p>
                    </div>
                )
            })}
            <h1>Tus Generos favoritos</h1>
            {genres === "" ? (
                //Mapeamos el array que tenemos en cada momento
                genres.map((genre, index) => {
                    return (
                        <div key={index}>
                            <CartaFavoritos title={genre.name} />
                        </div>
                    );
                })
            ) : (
                <div>
                    <p>No tienes Generos favoritos</p>
                </div>
            )}
            <h1>Tus Juegos favoritos</h1>
            {games === "" ? (
                //Mapeamos el array que tenemos en cada momento
                games.map((game, index) => {
                    return (
                        <div key={index}>
                            <CartaFavoritos title={game.name} />
                        </div>
                    );
                })
            ) : (
                <div>
                    <p>No tienes Juegos favoritos</p>
                </div>
            )}
        </>
    );
};

export default DatosPerfil;
