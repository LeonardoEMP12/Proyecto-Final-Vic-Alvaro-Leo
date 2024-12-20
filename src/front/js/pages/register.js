import React from "react";
import "../../styles/register.css";


const Register = () => {
  return (
    <div className="container min-vh-100 d-flex align-items-center">
			<div className="row w-100">
				
				<div className="col-md-6 formulario-contenedor">
					<h1 className="text-center mb-4 formulario-titulo">Formulario de Registro</h1>
					<form>
						
						<div className="mb-4">
							<label htmlFor="nombre" className="formulario-label">Nombre</label>
							<input type="text" className="formulario-input" id="nombre" placeholder="Ingresa tu nombre" required />
						</div>
						
						<div className="mb-4">
							<label htmlFor="email" className="formulario-label">Correo Electrónico</label>
							<input type="email" className="formulario-input" id="email" placeholder="Ingresa tu correo" required />
						</div>

						<div className="mb-4">
							<label htmlFor="password" className="formulario-label">Contraseña</label>
							<input type="password" className="formulario-input" id="password" placeholder="Crea una contraseña" required />
						</div>
						
						<div className="mb-4">
							<label htmlFor="confirmPassword" className="formulario-label">Confirmar Contraseña</label>
							<input type="password" className="formulario-input" id="confirmPassword" placeholder="Repite la contraseña" required />
						</div>
						
						<div className="d-grid">
							<button type="submit" className="formulario-boton">Registrarse</button>
						</div>
					</form>
				</div>

				
				<div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
					<h1>Imagen logo</h1>
				</div>
			</div>
		</div>
  );
};

export default Register;
