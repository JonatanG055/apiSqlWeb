import React from 'react';
import './LoginButton.css';

function LoginButton({ onClick }) {
  return (
    <div className="login-button-container">
      <button className="login-button" onClick={onClick}>
        Iniciar sesión
      </button>
    </div>
  );
}

export default LoginButton;
