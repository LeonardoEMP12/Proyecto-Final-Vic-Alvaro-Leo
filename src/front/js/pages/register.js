import React, { useContext, useState } from "react";
import "../../styles/register.css";
import OMNIAlogo from "../../img/LogoOM.png"
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa6";



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
  const [password, setPassword] = useState('password');
  const [confirmPassword, setConfirmPassword] = useState('password');
  // Validacion de la contraseña
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === "password") {
      const lower = new RegExp('(?=.*[a-z])');
      const upper = new RegExp('(?=.*[A-Z])');
      const number = new RegExp('(?=.*[0-9])');
      const special = new RegExp('(?=.*[!@#\$%\^&\*])');
      const length = new RegExp('(?=.{8,})')
      if (lower.test(value)) {
        setLowerValidated(true);
      }
      else {
        setLowerValidated(false);
      }
      if (upper.test(value)) {
        setUpperValidated(true);
      }
      else {
        setUpperValidated(false);
      }
      if (number.test(value)) {
        setNumberValidated(true);
      }
      else {
        setNumberValidated(false);
      }
      if (special.test(value)) {
        setSpecialValidated(true);
      }
      else {
        setSpecialValidated(false);
      }
      if (length.test(value)) {
        setLengthValidated(true);
      }
      else {
        setLengthValidated(false);
      }
    }
  };
  const isFormValid = () => {
    const isPasswordValid =
      lowerValidated &&
      upperValidated &&
      numberValidated &&
      specialValidated &&
      lengthValidated;
    const areFieldsFilled =
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.confirm_password.trim() !== "";
    const doPasswordsMatch = formData.password === formData.confirm_password;

    return isPasswordValid && areFieldsFilled && doPasswordsMatch;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert("Por favor, asegúrate de que todas las validaciones estén completas.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      alert("Las contraseñas no coinciden");
      return;
    }


    fetch(process.env.BACKEND_URL + "api/signup", {
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
        alert("Hubo un problema con el registro final");
        console.error(error);
      });
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-12 col-md-6 formulario-contenedor d-flex justify-content-center align-items-center">


          <div>
            <img src={OMNIAlogo} className="img-fluid w-75 mx-auto d-block mt-5 mb-5 d-block d-sm-block d-md-none" alt="Logo OMNIA" />
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

              <div className="">
                <label htmlFor="password" className="formulario-label">Contraseña</label>
                <input
                  type={password}
                  className="formulario-input"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Crea una contraseña"
                  required
                />
                {password === "password" ? (
                  <span className='icon-span' onClick={() => setPassword("text")}>
                    <FaRegEyeSlash />
                  </span>
                ) : (
                  <span className='icon-span' onClick={() => setPassword("password")}>
                    <FaRegEye />
                  </span>
                )}
              </div>
              <main className='tracker-box mb-4'>
                <div className={lowerValidated ? 'validated' : 'not-validated'}>
                  {lowerValidated ? (
                    <span className='list-icon green'>
                      <FaRegCircleCheck />
                    </span>
                  ) : (
                    <span className='list-icon'>
                      <FaRegCircle />
                    </span>
                  )}
                  At least one lowercase letter
                </div>
                <div className={upperValidated ? 'validated' : 'not-validated'}>
                  {upperValidated ? (
                    <span className='list-icon green'>
                      <FaRegCircleCheck />
                    </span>
                  ) : (
                    <span className='list-icon'>
                      <FaRegCircle />
                    </span>
                  )}
                  At least one uppercase letter
                </div>
                <div className={numberValidated ? 'validated' : 'not-validated'}>
                  {numberValidated ? (
                    <span className='list-icon green'>
                      <FaRegCircleCheck />
                    </span>
                  ) : (
                    <span className='list-icon'>
                      <FaRegCircle />
                    </span>
                  )}
                  At least one number
                </div>
                <div className={specialValidated ? 'validated' : 'not-validated'}>
                  {specialValidated ? (
                    <span className='list-icon green'>
                      <FaRegCircleCheck />
                    </span>
                  ) : (
                    <span className='list-icon'>
                      <FaRegCircle />
                    </span>
                  )}
                  At least one special character
                </div>
                <div className={lengthValidated ? 'validated' : 'not-validated'}>
                  {lengthValidated ? (
                    <span className='list-icon green'>
                      <FaRegCircleCheck />
                    </span>
                  ) : (
                    <span className='list-icon'>
                      <FaRegCircle />
                    </span>
                  )}
                  At least 8 characters
                </div>
              </main>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="formulario-label">Confirmar Contraseña</label>
                <input
                  type={confirmPassword}
                  className="formulario-input"
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Repite la contraseña"
                  required
                />
                {confirmPassword === "password" ? (
                  <span className='icon-span' onClick={() => setConfirmPassword("text")}>
                    <FaRegEyeSlash />
                  </span>
                ) : (
                  <span className='icon-span' onClick={() => setConfirmPassword("password")}>
                    <FaRegEye />
                  </span>
                )}
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
