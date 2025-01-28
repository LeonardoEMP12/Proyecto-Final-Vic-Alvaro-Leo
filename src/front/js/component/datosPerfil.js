import React, { useState, useEffect, useContext } from "react";
import "../../styles/Carousel.css";
import CartaFavoritos from "./CartaFavoritos.js";
import { Context } from "../store/appContext";
import "../../styles/datosPerfil.css"



const DatosPerfil = () => {
    const { actions } = useContext(Context);
    const user = localStorage.getItem("userId");
    const [perfil, setPerfil] = useState([]);
    const [genres, setGenres] = useState([]);
    const [games, setGames] = useState([]);
    const [usuario, setUsuario] = useState([""]);
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [birth_date, setBirth_date] = useState("");
    const fetchPerfil = () => {
        fetch(process.env.BACKEND_URL + `api/perfil/${user}`)
            .then((response) => response.json())
            .then((response) => {
                setPerfil(response.profiles)
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
    }, [genres, games]);
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
        <div className="container">
            {perfil.map((perfil, index) => {
                return (
                    <div className="mb-4" key={index}>
                        {/* Contenedor con distribución en la misma fila */}
                        <div className="d-flex justify-content-between align-items-center mt-5">
                            <h1 className="titulo-perfil">@{perfil.username}</h1>
                            <div className="d-flex gap-3">
                                <button className="btn btn-primary">Editar Perfil</button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        actions.setId();
                                        actions.setToken();
                                        actions.setName();
                                    }}
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                        <p className="mt-3 text-center">Correo: {usuario.email}</p>
                        <p className="text-center">Fecha de nacimiento: {perfil.birth_date}</p>
                        <h3 className="mt-5 text-center">Descripción</h3>
                        <p className="text-center">{perfil.description}</p>
                    </div>
                );
            })}

            <h1 className="titulo-perfil mt-5 text-center">Tus Géneros favoritos</h1>
            {genres?.length > 0 ? (
                <div className="row">
                    {genres.map((genre, index) => {
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={index}>
                                <CartaFavoritos title={genre.name} id={genre.id} />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div id="NoGenero" className="text-center mt-3">
                    <p>No tienes Géneros favoritos</p>
                </div>
            )}

            <h1 className="titulo-perfil mt-5 text-center">Tus Juegos favoritos</h1>
            {games?.length > 0 ? (
                <div className="row">
                    {games.map((game, index) => {
                        return (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={index}>
                                <CartaFavoritos title={game.name} id={game.id} />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div id="NoJuego" className="text-center mt-3">
                    <p>No tienes Juegos favoritos</p>
                </div>
            )}
        </div>

    );

};

export default DatosPerfil;
