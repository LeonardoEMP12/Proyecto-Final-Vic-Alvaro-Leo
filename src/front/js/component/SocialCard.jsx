import React from 'react';
import "../../styles/SocialCard.css";


const SocialCard = ({ image, title, description, comments }) => {
  return (
    <div className="social-card mt-4 text-start">
      <div className="card-content">
        <h3>@{title}</h3>
        <p>{description}</p>
      </div>
      <div className="card-image">
        <img src={image} alt={image} />
      </div>  


      <div className="row align-items-center justify-content-center my-2">
  {/* Botón de comentarios */}
  <div className="card-actions col-auto">
    <button className="comment-btn btn btn-link">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#ffd200"
        className="bi bi-chat-dots"
        viewBox="0 0 16 16"
      >
        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
      </svg>{" "}
      {comments}
    </button>
  </div>

  {/* Input y botón de envío */}
  <div className="col">
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Añade un comentario..."
        aria-describedby="button-addon2"
      />
      <button className="btn btn-outline-secondary" type="button" id="button-addon2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#ffd200"
          className="bi bi-send"
          viewBox="0 0 16 16"
        >
          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
        </svg>
      </button>
    </div>
  </div>
</div>





    </div>
  );
};

export default SocialCard;