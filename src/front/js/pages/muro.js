import React, { useContext, useEffect, useState } from "react";
import "../../styles/muro.css";
import OMNIAlogo from "../../img/LogoOM.png"
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import SocialCard from "../component/SocialCard.jsx";

const Muro = () => {
    const [post, setPost] = useState([]);
    

    const publicaciones = () => fetch(process.env.BACKEND_URL + "/api/posts")
        .then((response)=>response.json())
        .then((response)=>setPost(response.message))
        .catch((error)=>error)

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
                <div className="d-flex justify-content-end">
                    <div className="me-3">Añadir publicacion</div>
                    <div>Editar Perfil</div>
                </div>
                {post.map((post) => (
                    <div className="cuerpo">
                    <SocialCard 
                    title={post.post_user.name} 
                    description={post.post_text}
                    image={post.post_image}/>
                    </div>
                ))}
            </div>      
            <div className="col-md-2 fondo3">noticias</div>
        </div>
        );
};

export default Muro;
