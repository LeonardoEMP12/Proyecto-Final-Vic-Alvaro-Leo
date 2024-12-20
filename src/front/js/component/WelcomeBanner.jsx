// WelcomeBanner.js
import React from 'react';
import Logo from '/workspaces/Proyecto-Final-Vic-Alvaro-Leo/src/front/img/OMNIAlogo.png';
import ButtonComponent from "../component/Buttoncomponent.jsx";

const WelcomeBanner = () => {
  return (
    <div className="row m-5">
        <div className="col-8 py-5 text-start">
          <h1 className="display-5 fw-bold">OMNIA</h1>
          <p className="fs-4">
          Donde los gamers crean historias.
          </p>
          <ButtonComponent/>
        </div>
        <img src={Logo} alt='OMNIA' className='col-4'/>
      </div>
  );
};

export default WelcomeBanner;
