import React, { useEffect, useState } from "react";
import "../../styles/muro.css";
import SocialCard from "../component/SocialCard.jsx";
import OMNIAlogo from "../../img/LogoOM.png";
import FavGenreComponent from "../component/FavGenreComponent.jsx";

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
            <div className="d-flex col-md-2">
                <nav className="navbar flex-column container">
                    <a
                        href="#"
                        className={`navigate-icon ${activeTab === "publicaciones" ? "active" : ""}`}
                        onClick={() => setActiveTab("publicaciones")}
                    >
                        <img src={OMNIAlogo} alt="OMNIA Logo" className="img-fluid" />
                    </a>
                    <a
                        href="#"
                        className={`navigate-icon my-5 ${activeTab === "publicaciones" ? "active" : ""}`}
                        onClick={() => setActiveTab("publicaciones")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                        </svg>
                    </a>
                    <a
                        href="#"
                        className={`navigate-icon my-5 ${activeTab === "perfil" ? "active" : ""}`}
                        onClick={() => setActiveTab("perfil")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-controller" viewBox="0 0 16 16">
                            <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1z" />
                            <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729q.211.136.373.297c.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466s.34 1.78.364 2.606c.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527s-2.496.723-3.224 1.527c-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.3 2.3 0 0 1 .433-.335l-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a14 14 0 0 0-.748 2.295 12.4 12.4 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.4 12.4 0 0 0-.339-2.406 14 14 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27s-2.063.091-2.913.27" />
                        </svg>
                    </a>
                    <a
                        href="#"
                        className={`navigate-icon my-5 ${activeTab === "configuracion" ? "active" : ""}`}
                        onClick={() => setActiveTab("configuracion")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                        </svg>
                    </a>
                    <a
                        href="#"
                        className={`navigate-icon my-5 ${activeTab === "configuracion" ? "active" : ""}`}
                        onClick={() => setActiveTab("configuracion")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                        </svg>
                    </a>
                </nav>
            </div>





            {/* Contenido dinámico */}
            <div className="col-md-8 fondo2">
                {activeTab === "publicaciones" && (
                    <div>
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
                            <button
                                id="PerfilBoton"
                                type="button"
                                className="btn btn-primary me-3"
                            >
                                Editar Perfil
                            </button>
                        </div>
                        {post.map((postItem) => (
                            <div className="cuerpo" key={postItem.id}>
                                <SocialCard
                                    title={postItem.post_user.name}
                                    description={postItem.post_text}
                                    image={postItem.post_image}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "perfil" && (
                    <div>
                        <h2>Videojuegos</h2>
                        <p>Vista de todos los videojuegos aquí, tambien se puede hacer otro componente para ponerlo aqui dentro</p>
                    </div>
                )}

                {activeTab === "configuracion" && (
                    <div>
                        <h2>Configuración</h2>
                        <p>Opciones de configuración de la cuenta.</p>
                    </div>
                )}
            </div>





            {/* Noticias */}
            <div 
    className="col-md-2 fondo3"
    onClick={() => window.open('https://www.nintendo.com/successor/es-es/index.html?srsltid=AfmBOormJY7WxHvSLOif5f5Gir8cLHWAruBG8ep78xeYP_0PRaKtpKRw')} 
    style={{ cursor: 'pointer' }} // Cambia el cursor a "pointer" para indicar que es clickeable
>
    <div className="card card-border card-noticia">
        <img src="https://media.discordapp.net/attachments/846027562860675156/1329896793315610775/switch2.jpg?ex=678c0267&is=678ab0e7&hm=ce1e6b365ff1cf8abee8c8685866a2dcfdef1b2bc4e0a072f2631b062ae0ea10&=&format=webp&width=450&height=252" />
        <div className="card-body">
            <h5 className="titular-noticia">Se anuncia la Nintendo Switch 2</h5>
        </div>
    </div>
</div>

<div 
    className="col-md-2 fondo3"
    onClick={() => window.open('https://www.nintendo.com/successor/es-es/index.html?srsltid=AfmBOormJY7WxHvSLOif5f5Gir8cLHWAruBG8ep78xeYP_0PRaKtpKRw')} 
    style={{ cursor: 'pointer' }} // Cambia el cursor a "pointer" para indicar que es clickeable
>
    <div className="card card-border card-noticia">
        <img src="https://media.discordapp.net/attachments/846027562860675156/1329896793315610775/switch2.jpg?ex=678c0267&is=678ab0e7&hm=ce1e6b365ff1cf8abee8c8685866a2dcfdef1b2bc4e0a072f2631b062ae0ea10&=&format=webp&width=450&height=252" />
        <div className="card-body">
            <h5 className="titular-noticia">Se anuncia la Nintendo Switch 2</h5>
        </div>
    </div>
</div>

<div 
    className="col-md-2 fondo3"
    onClick={() => window.open('https://www.nintendo.com/successor/es-es/index.html?srsltid=AfmBOormJY7WxHvSLOif5f5Gir8cLHWAruBG8ep78xeYP_0PRaKtpKRw')} 
    style={{ cursor: 'pointer' }} // Cambia el cursor a "pointer" para indicar que es clickeable
>
    <div className="card card-border card-noticia">
        <img src="https://media.discordapp.net/attachments/846027562860675156/1329896793315610775/switch2.jpg?ex=678c0267&is=678ab0e7&hm=ce1e6b365ff1cf8abee8c8685866a2dcfdef1b2bc4e0a072f2631b062ae0ea10&=&format=webp&width=450&height=252" />
        <div className="card-body">
            <h5 className="titular-noticia">Se anuncia la Nintendo Switch 2</h5>
        </div>
    </div>
</div>

        </div>
    );
};

export default Muro;
