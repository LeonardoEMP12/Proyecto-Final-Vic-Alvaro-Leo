import React, { useState } from "react";
import "../../styles/register.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
    
    fetch(process.env.BACKEND_URL+"/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      })

      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al comunicarse con el servidor");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error || "Hubo un problema con el inicio de sesión");
        } else {
          alert("Inicio de sesión exitoso");
          // Aquí puedes manejar la redirección o almacenamiento de tokens
          console.log("Datos del usuario:", data);
        }
      })
      .catch((error) => {
        console.error("Error en el proceso de inicio de sesión:", error);
        alert("Hubo un problema con el inicio de sesión. Por favor, inténtalo de nuevo.");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-12 formulario-contenedor mt-5">
          <h1 className="text-center mb-4 formulario-titulo">Login</h1>
          <form onSubmit={handleSubmit}>
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

            <div className="d-grid">
              <button type="submit" className="formulario-boton">Iniciar sesión</button>
            </div>
          </form>
        <div>

        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
