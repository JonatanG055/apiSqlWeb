import React from 'react';
import './RegisterButton.css';

function RegisterButton({ onClick }) {
  return (
    <div className="register-button-container">
      <button className="register-button" onClick={onClick}>
        Registrarse
      </button>
    </div>
  );
}

export default RegisterButton;
