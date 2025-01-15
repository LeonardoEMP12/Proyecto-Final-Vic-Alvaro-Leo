import React, { useContext, useState } from "react";
import "../../styles/register.css";
import OMNIAlogo from "../../img/LogoOM.png"
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Email = () => {

const { actions } = useContext(Context);
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();


    fetch(process.env.BACKEND_URL + "/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        }),
    })
      .then((response) => response.json())
      .then((data) => {
          alert("Se ha enviado un correo para el cambio de contraseña");
          // Modal de se ha mandado un correo
          navigate("/");
       
      })
      .catch((error) => {
        console.log("catch");
        alert("Hubo un problema con el registro");
        console.error(error);
      });
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
    <div className="row w-100">
      <div className="col-12 col-md-6 formulario-contenedor d-flex justify-content-center align-items-center">
         
      
        <div>
        <img src={OMNIAlogo} className="img-fluid w-75 mx-auto d-block mt-5 mb-5 d-block d-sm-block d-md-none" alt="Logo OMNIA"/>
          <h1 className="text-center mb-4 formulario-titulo">Reseteo de contraseña</h1>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="formulario-label">Correo Electrónico</label>
              <input
                type="email"
                className="formulario-input"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu correo"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="formulario-boton">Resetear contraseña</button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-12 col-md-6 d-flex justify-content-center align-items-center mt-5 d-none d-md-flex">
        <img src={OMNIAlogo} className="img-fluid w-75" alt="Logo OMNIA" />
      </div>
    </div>


  </div>
);
};

export default Email;
