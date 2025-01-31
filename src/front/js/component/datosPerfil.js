import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import CartaFavoritosGeneros from "./CartaFavoritosGeneros.js";
import CartaFavoritosJuegos from "./CartaFavoritosJuegos.js";
import "../../styles/datosPerfil.css";


const DatosPerfil = () => {
    const { actions, store } = useContext(Context);
    const user = localStorage.getItem("userId");
    const [perfil, setPerfil] = useState([]);
    const [genres, setGenres] = useState([]);
    const [games, setGames] = useState([]);
    const [usuario, setUsuario] = useState([""]);
    const [username, setUsername] = useState();
    const [description, setDescription] = useState();
    const [birth_date, setBirth_date] = useState("");

    const fetchPerfil = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + `api/perfil/${user}`);
            const data = await response.json();
            setPerfil(data.profiles);
            setUsuario(data.user);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchFavoriteGenres = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + `api/favorites-genres/${user}`);
            const data = await response.json();
            setGenres(data.message.favorite_genres);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchFavoriteGames = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + `api/favorites-games/${user}`);
            const data = await response.json();
            setGames(data.message.favorite_games);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPerfil();
        fetchFavoriteGames();
        fetchFavoriteGenres();
    }, [store.actualizador]);

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleBirthDate = (event) => {
        setBirth_date(event.target.value);
    };

    const putUsername = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + `api/profile/${user}/username`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username }),
            });
            const updatedData = await response.json();
            setPerfil((prevPerfil) => prevPerfil.map((p) => (p.id === updatedData.id ? { ...p, username: updatedData.username } : p)));
        } catch (error) {
            console.error(error);
        }
    };

    const putDescription = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + `api/profile/${user}/description`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description: description }),
            });
            const updatedData = await response.json();
            setPerfil((prevPerfil) => prevPerfil.map((p) => (p.id === updatedData.id ? { ...p, description: updatedData.description } : p)));
        } catch (error) {
            console.error(error);
        }
    };

    const putBirthdate = async () => {
        try {
            const response = await fetch(process.env.BACKEND_URL + `api/profile/${user}/birth_date`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ birth_date: birth_date }),
            });
            const updatedData = await response.json();
            setPerfil((prevPerfil) => prevPerfil.map((p) => (p.id === updatedData.id ? { ...p, birth_date: updatedData.birth_date } : p)));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container pb-5">
            {perfil.map((perfil, index) => (
                <div key={index} className="mb-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-5">
                        <h1 className="titulo-perfil">@{perfil.username}</h1>
                        <div className="d-flex gap-3 flex-column flex-md-row align-items-center mt-3 mt-md-0">
                            <button
                                id="BotonPerfil"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#EditModal"
                            >
                                Editar Perfil
                            </button>
                            <button
                                id="BotonCerrar"
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
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6 mt-5">
                            <div id="EtiquetaDatos" className="p-4">
                                <p className="mt-3 text-center">Correo:</p> <h4 className="text-center mb-5 description">{usuario.email}</h4>
                                <p className="text-center">Fecha de nacimiento:</p> <h4 className="text-center mb-5">{perfil.birth_date}</h4>
                                <p className="mt-5 text-center">Descripción</p>
                                <h4 className="text-center mb-5">{perfil.description}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <h1 className="titulo-perfil m-5 text-center">Tus Géneros favoritos</h1>
            {genres?.length > 0 ? (
                <div className="row align-items-center">
                    {genres.map((genre, index) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={index}>
                            <CartaFavoritosGeneros title={genre.name} id={genre.id} />
                        </div>
                    ))}
                </div>
            ) : (
                <div id="NoGenero" className="text-center mt-3 align-items-center">
                    <p>No tienes Géneros favoritos</p>
                </div>
            )}

            <h1 className="titulo-perfil m-5 text-center">Tus Juegos favoritos</h1>
            {games?.length > 0 ? (
                <div className="row">
                    {games.map((game, index) => (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={index}>
                            <CartaFavoritosJuegos title={game.name} id={game.id} />
                        </div>
                    ))}
                </div>
            ) : (
                <div id="NoJuego" className="text-center mt-3 align-items-center">
                    <p>No tienes Juegos favoritos</p>
                </div>
            )}

            {/* Modal de edición */}
            <div className="modal fade" id="EditModal" tabIndex="-1" aria-labelledby="EditModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="EditModalLabel">Editar Información</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="username" className="col-form-label">Nombre de usuario:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username || ""}
                                        onChange={handleUsername}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="col-form-label">Descripción:</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        value={description}
                                        onChange={handleDescription || ""}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="birth_date" className="col-form-label">Fecha de nacimiento:</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="birth_date"
                                        value={birth_date}
                                        onChange={handleBirthDate || ""}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cerrar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    putUsername();
                                    putDescription();
                                    putBirthdate();
                                    actions.toggleEstado();
                                }}
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatosPerfil;

