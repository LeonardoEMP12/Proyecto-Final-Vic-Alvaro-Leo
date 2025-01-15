import React, { useContext, useState } from "react";
import "../../styles/register.css";
import OMNIAlogo from "../../img/LogoOM.png"
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";




const Register = () => {

const { actions } = useContext(Context);
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    creation_date: new Date()
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


    if (formData.password !== formData.confirm_password) {
      alert("Las contraseñas no coinciden");
      return;
    }


    fetch(process.env.BACKEND_URL + "/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirm_password,
        creation_date: formData.creation_date
      }),
    })
      .then((response) => response.json())
      .then((data) => {
          if (data.message) {
          actions.setId(data.message.id);
          navigate("/selectfavgenre");
        } else {
          alert(data.error || "Hubo un problema con el registro");
        }
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
          <h1 className="text-center mb-4 formulario-titulo">Formulario de Registro</h1>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="formulario-label">Nombre</label>
              <input
                type="text"
                className="formulario-input"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

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

            <div className="mb-4">
              <label htmlFor="password" className="formulario-label">Contraseña</label>
              <input
                type="password"
                className="formulario-input"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Crea una contraseña"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="formulario-label">Confirmar Contraseña</label>
              <input
                type="password"
                className="formulario-input"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                placeholder="Repite la contraseña"
                required
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="formulario-boton">Registrarse</button>
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

export default Register;
