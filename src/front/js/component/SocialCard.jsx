import React from 'react';

const SocialCard = ({ image, title, description, likes, comments }) => {
  return (
    <div className="social-card mt-4 text-start">
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="card-image">
        <img src={image} alt={title} />
      </div>      
      <div className="card-actions">
        <button className="like-btn">❤️ {likes}</button>
        <button className="comment-btn">💬 {comments}</button>
      </div>
    </div>
  );
};

export default SocialCard;