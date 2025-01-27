import React, { useEffect, useState } from "react";
import "../../styles/muro.css";
import SocialCard from "../component/SocialCard.jsx";
import OMNIAicon from "../../img/OMNIAicon.png";
import OMNIAtext from "../../img/OMNIAtext.png";
import Carousel from "../component/Carousel.jsx";
import ModalPost from "../component/modalpost.js";
import NoticiasMuro from "../component/noticiasMuro.js";
import FavGenreComponent from "../component/FavGenreComponent.jsx"

const Muro = () => {
    const [post, setPost] = useState([]);
    const [activeTab, setActiveTab] = useState("publicaciones");

    const publicaciones = () =>
        fetch(process.env.BACKEND_URL + "/api/posts")
            .then((response) => response.json())
            .then((response) => setPost(response.message))
            .catch((error) => console.error(error));

    useEffect(() => {
        publicaciones();
    }, []);

    return (
        <div className="row body">

            {/* Navbar lateral */}
            <nav className="navbar flex-column" id="navegacion">
                <a
                    className={`navigate-icon mt-4 mb-0 ${activeTab === "publicaciones" ? "active" : ""}`}
                    onClick={() => setActiveTab("publicaciones")}
                >
                    <img src={OMNIAicon} alt="OMNIA" className="img-fluid" id="icon-omnia" />
                    <span class="hover-text" id="text-omnia">
                        <img src={OMNIAtext} alt="OMNIA" className="img-fluid" />
                    </span>
                </a>

                <a
                    className={`navigate-icon ${activeTab === "videojuegos" ? "active" : ""}`}
                    onClick={() => setActiveTab("videojuegos")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-controller" viewBox="0 0 16 16">
                        <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1z" />
                        <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729q.211.136.373.297c.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466s.34 1.78.364 2.606c.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527s-2.496.723-3.224 1.527c-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.3 2.3 0 0 1 .433-.335l-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a14 14 0 0 0-.748 2.295 12.4 12.4 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.4 12.4 0 0 0-.339-2.406 14 14 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27s-2.063.091-2.913.27" />
                    </svg>
                    <span class="hover-text">VIDEOJUEGOS</span>
                </a>
                <a
                    className={`navigate-icon ${activeTab === "configuracion" ? "active" : ""}`}
                    onClick={() => setActiveTab("configuracion")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                    </svg>
                    <span class="hover-text">CONFIGURACION</span>
                </a>
                <a
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    className="navigate-icon mb-4 mt-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                    </svg>
                    <span class="hover-text" id="publicar-btn">PUBLICAR</span>
                </a>

            </nav>

            {/* Div vacío para el espacio que ocupa la navbar */}
            <div className="d-flex fondo2 col-2 d-none d-md-block">

            </div>


            {/* Contenido dinámico */}
            <div className="col-12 col-md-8 fondo2 muro-content">
                {activeTab === "publicaciones" && (
                    <div>
                        <ModalPost />
                        {post.map((post, index) => (
                            <div className="cuerpo" key={index}>
                                <SocialCard
                                    title={post.post_user.username}
                                    description={post.post_text}
                                    image={post.post_image} 
                                    id = {post.id} />
                            </div>

                        ))}
                    </div>
                )}

                {activeTab === "videojuegos" && (

                    <div>
                        <ModalPost />
                        <div className="m-3" >
                            <h2 id="TituloVideojuegos" className="m-5">Todos los juegos</h2>
                            <Carousel />
                            <h2 id="TituloGeneros" className="m-5">Generos</h2>
                            <h4 id="SubtituloGeneros" className="m-5">Añade tus generos favoritos</h4>
                            <FavGenreComponent/>
                            
                        </div>
                    </div>
                )}

                {activeTab === "configuracion" && (
                    <div>
                        <ModalPost />
                        <h2>Configuración</h2>
                        <p>Opciones de configuración de la cuenta.</p>
                    </div>
                )}
            </div>


            {/* Noticias */}
            <NoticiasMuro/>
        </div>
    );
};

export default Muro;
