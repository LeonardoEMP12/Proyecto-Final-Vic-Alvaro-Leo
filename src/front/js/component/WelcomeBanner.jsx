// WelcomeBanner.js
import React from 'react';
import Logo from '/workspaces/Proyecto-Final-Vic-Alvaro-Leo/src/front/img/LogoOM.png';
import ButtonComponent from "../component/ButtonComponent.jsx";

const WelcomeBanner = () => {
  return (
    <div className="row m-5">
      <div className="col-8 py-5 text-start">
        <ButtonComponent />
      </div>
      <img src={Logo} alt='OMNIA' className='col-4' />
    </div>
  );
};

export default WelcomeBanner;
