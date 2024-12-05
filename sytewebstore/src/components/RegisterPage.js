import React, { useState } from 'react';
import './RegisterPage.css';

function RegisterPage({ onClose, setIsAuthenticated, setUser }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSubmitting) return; 

    setIsSubmitting(true);

    // Llamada a la API para registrar al usuario
    fetch('http://localhost:5045/api/Users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message && data.message.includes('creó correctamente')) {
          // Guarda al usuario en localStorage
          const user = { nombre, email };
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);  // Actualiza el estado con el usuario registrado
          setIsAuthenticated(true);  // Marca al usuario como autenticado
          onClose(); // Cierra el formulario
        } else {
          setErrorMessage(data.message || 'Error desconocido');
        }
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Hubo un problema al registrar al usuario');
        setIsSubmitting(false);
      });
  };

  return (
    <div className="register-page">
      <h1>Regístrate en ByteStore</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={isSubmitting}>Registrarse</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}

export default RegisterPage;
