import React from "react";
import "../../styles/landingpage.css";
import OMNIAlogo from "../../img/LogoOM.png";
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<div id="BackgroundLanding" className="container-fluid vh-100 p-0">
			<div className="row">
				<div id="FondoLanding" className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center vh-100 p-0">
					<div id="ContLanding" className="col-10 col-md-8 col-lg-6 d-flex flex-column justify-content-center align-items-center formulario-contenedor mx-auto mt-5">
					<Link to="/login"><button id="Inicio" type="button" className="btn btn-secondary">Iniciar sesion</button></Link>
					<Link to="/register"><button id="Registro" type="button" className="btn btn-secondary mt-4">Registrarse</button></Link>
					<div className="text-center mt-5 d-block d-sm-none">
							<img src={OMNIAlogo} alt="OMNIA Logo" className="img-fluid" />
						</div>
					</div>
					<div className="text-center">
					<h1 id="Frase" className="mt-5" >Tu red Social para videojuegos</h1>
					</div>
				</div>
				<div className="col-6 d-none d-md-flex d-flex justify-content-center align-items-center bg-succes logo-container">
					<img src={OMNIAlogo} alt="OMNIA Logo" className="img-fluid" />
					
				</div>
			</div>
		</div>
	);
};

export default Landing;