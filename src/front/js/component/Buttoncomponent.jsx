import React from 'react';
import Button from './Button.jsx';

const ButtonComponent = () => {
  const buttonData = [
    {
      text: 'Iniciar sesión',
      color: 'primary',
      link: 'https://www.Google.com',
    },
    {
      text: 'Registrarse',
      color: 'light',
      link: '#',
    },
  ];

  return (
    <div>
      <div>
        {buttonData.map((button, index) => (
          <Button
            key={index}
            text={button.text}
            color={button.color}
            link={button.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ButtonComponent;