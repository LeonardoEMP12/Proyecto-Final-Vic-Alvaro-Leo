import React, { useContext, useState } from "react";
import "../../styles/register.css";
import OMNIAlogo from "../../img/LogoOM.png"
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";



const NewPassword = () => {

const { actions } = useContext(Context);
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
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
        password: formData.password,
        confirm_password: formData.confirm_password,
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
          <h1 className="text-center mb-4 formulario-titulo">Cambio de contraseña</h1>
          <form autoComplete="off" onSubmit={handleSubmit}>
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
              <button type="submit" className="formulario-boton">Cambiar contraseña</button>
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

export default NewPassword;
