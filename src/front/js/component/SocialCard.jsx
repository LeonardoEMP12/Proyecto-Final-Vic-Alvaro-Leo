import React, { useState, useEffect } from 'react';
import "../../styles/SocialCard.css";
import OMNIAicon from "../../img/OMNIAicon.png";

const SocialCard = ({ image, title, description, id }) => {
  const user = localStorage.getItem("userId");
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]); // Estado para almacenar todos los posts

  // Función para manejar el comentario
  const handleComentario = (value) => {
    setText(value.target.value);
  };

  // Publicar comentario en el servidor
  const publicarComentario = () => {
    fetch(process.env.BACKEND_URL + "api/create-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        post_id: id,
        user_id: user,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response.message);
        fetchPosts(); // Recargar posts después de publicar el comentario
      })
      .catch((error) => console.error(error));

      setText(" ")
  };

  // Función para obtener todos los posts
  const fetchPosts = () => {
    fetch(process.env.BACKEND_URL + "api/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.message); // Guardar todos los posts en el estado
      })
      .catch((error) => console.error(error));
  };

  // Función para obtener comentarios de un post específico
  const fetchComments = () => {
    const post = posts.find((post) => post.id === id); // Filtrar el post específico por id
    if (post) {
      setComments(post.comments); // Actualizar el estado con los comentarios del post específico
    }
  };

  // Función para alternar la visibilidad del modal
  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      fetchPosts(); // Cargar los posts cuando se abre el modal
    }
  };

  // Hook de efecto para obtener los posts cuando el componente se monte
  useEffect(() => {
    fetchPosts();
  }, []);

  // Filtrar los comentarios del post al abrir el modal
  useEffect(() => {
    if (showModal) {
      fetchComments(); // Obtener comentarios cuando el modal se abre
    }
  }, [showModal]);

  // Hook para cerrar el modal al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalElement = document.querySelector(".modal-content");
      if (modalElement && !modalElement.contains(event.target)) {
        setShowModal(false); // Cerrar modal si el clic es fuera de él
      }
    };

    // Agregar el evento de escucha para el clic en el documento
    if (showModal) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Limpiar el evento cuando el componente se desmonte o el modal se cierre
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="social-card mt-4 text-start justify-content-end col-8 col-md-6">
      <div className="card-content">
        <div className="d-flex justify-content-end align-items-center">
          <h3 className="mb-0 me-2">@{title}</h3>
          <img src={OMNIAicon} className="OMNIAicon" alt="Logo OMNIA" />
        </div>
        <p>{description}</p>
      </div>
      <div className="card-image">
        <img src={image} alt={image} />
      </div>

      <div className="row align-items-end justify-content-center my-3">
        {/* Botón de comentarios */}
        <div className="card-actions col-auto">
          <button className="comment-btn btn btn-link" onClick={toggleModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#ffd200"
              className="bi bi-chat-dots"
              viewBox="0 0 16 16">
              <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
              <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
            </svg>
          </button>
        </div>

        {/* Input y botón de envío */}
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Añade un comentario..."
              onChange={handleComentario}
              value={text}
            />
            <button className="btn btn-outline-secondary" type="button" onClick={publicarComentario}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#ffd200"
                className="bi bi-send"
                viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal para mostrar comentarios */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Comentarios</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
              <div className="modal-body flex-column">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="comment-container mb-4">
                      {/* Username */}
                      <div className="comment-user">
                        <strong>@{comment.username}:</strong>
                      </div>

                      {/* Comentario */}
                      <div className="comment-text">
                        <p>{comment.comment_text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No hay comentarios.</p>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialCard;
