//WelcomeBanner
import React from "react";
import { useNavigate } from "react-router-dom";
import OMNIAlogo from "../../img/LogoOM.png";
import movilPLACEHOLDER from "../../img/movilPLACEHOLDER.png"
import "../../styles/landingpage.css";

const WelcomeBanner = () => {
  const navigate = useNavigate();

  const buttonData = [
    {
      text: "Registrarse",
      color: "btn-yellow",
      route: "/register",
    },
    {
      text: "Iniciar sesión",
      color: "btn-white",
      route: "/login",
    },
  ];

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-12 col-md-6 formulario-contenedor d-flex flex-column justify-content-center align-items-center">
        <img
            src={OMNIAlogo}
            className="img-fluid w-75"
            alt="Logo OMNIA"
          />
          
          <div className="d-flex flex-column align-items-center">
            {buttonData.map((button, index) => (
              <button
                key={index}
                type="button"
                className={`my-2 ${button.color}`}
                onClick={() => navigate(button.route)}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center mt-5 d-none d-md-flex">
        <img
            src={movilPLACEHOLDER}
            className="img-fluid w-75 d-none"
            alt="Logo OMNIA"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;