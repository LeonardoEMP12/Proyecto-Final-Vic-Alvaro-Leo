import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonComponent = () => {
  const navigate = useNavigate();

  const buttonData = [
    {
      text: 'Iniciar sesión',
      color: 'green',
      route: '/login',
    },
    {
      text: 'Registrarse',
      color: 'white',
      route: '/register',
    },
  ];

  return (
    <div>
      <div>
        {buttonData.map((button, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
            <button
              type="button"
              className={`my-2 w-100 btn btn-${button.color} rounded-pill`}
              onClick={() => navigate(button.route)} // Navega a la ruta especificada
            >
              <h5>{button.text}</h5>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonComponent;
