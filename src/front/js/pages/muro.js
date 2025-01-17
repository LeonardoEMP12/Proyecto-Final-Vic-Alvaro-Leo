import React, { useContext, useEffect, useState } from "react";
import "../../styles/muro.css";
import OMNIAlogo from "../../img/LogoOM.png"
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import SocialCard from "../component/SocialCard.jsx";

const Muro = () => {
    const [post, setPost] = useState([]);


    const publicaciones = () => fetch(process.env.BACKEND_URL + "/api/posts")
        .then((response) => response.json())
        .then((response) => setPost(response.message))
        .catch((error) => error)

    useEffect(() => {
        publicaciones();
    }, []);

    return (
        <div className="row body">
            <div className="d-flex col-md-2 fondo1">
                <nav
                    className="navbar navbar-light bg-light flex-column"
                >
                </nav>
            </div>

            <div className="col-md-8 fondo2">
                <div className="d-flex justify-content-end mt-3">
                    <button
                        id="botonPost"
                        type="button"
                        className="btn btn-primary me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                    >
                        Añadir publicación
                    </button>
                    <button id="PerfilBoton" type="button" className="btn btn-primary me-3">Editar Perfil</button>
                    <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div id="PostModal" className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Nueva publicación</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="message-text" className="col-form-label">
                                                ¿Listo para jugar?:
                                            </label>
                                            <textarea className="form-control" id="TextoPost"></textarea>
                                            <label className="mt-4" for="fileInput">Selecciona una imagen para subir:</label>
                                            <input type="file" id="fileInput" name="image" accept="image/*" required></input>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button
                                    id="Cerrar"
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Cerrar
                                    </button>
                                    <button id="Publicar" type="button" className="btn btn-primary">
                                        Publicar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {post.map((post, index) => (
                    <div className="cuerpo" key={index}>
                        <SocialCard
                            title={post.post_user.username}
                            description={post.post_text}
                            image={post.post_image} />
                    </div>
                ))}
            </div>
            <div className="col-md-2 fondo3">noticias</div>
        </div>
    );
};

export default Muro;
