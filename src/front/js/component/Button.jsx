import React from 'react';

const Button = ({ text, color, link }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <button type="button" className={`my-2 w-100 btn btn-${color} rounded-pill`} href={`${link}`}><h5>{text}</h5></button>
    </div>
  );
};

export default Button;
