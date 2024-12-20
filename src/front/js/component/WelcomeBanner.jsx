// WelcomeBanner.js
import React from 'react';
import Logo from '/workspaces/Proyecto-Final-Vic-Alvaro-Leo/src/front/img/logoplaceholder.png';
import ButtonComponent from "../component/Buttoncomponent.jsx";

const WelcomeBanner = () => {
  return (
    <div className="row m-5 border border-warning">
        <div className="col-8 py-5 text-start border border-primary">
          <h1 className="display-5 fw-bold">NOMBRE DE EJEMPLO</h1>
          <p className="fs-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <ButtonComponent/>
        </div>
        <img src={Logo} alt='Zenith' className='col-4 border border-primary'/>
      </div>
  );
};

export default WelcomeBanner;
