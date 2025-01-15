import React from 'react';

const SocialCard = ({ image, title, description, comments }) => {
  return (
    <div className="social-card mt-4 text-start">
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="card-image">
        <img src={image} alt={image} />
      </div>      
      <div className="card-actions">
        <button className="comment-btn">💬 {comments}</button>
      </div>
    </div>
  );
};

export default SocialCard;