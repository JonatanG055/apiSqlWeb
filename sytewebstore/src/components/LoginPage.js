import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onClose, setIsAuthenticated, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    // Llamada a la API para iniciar sesión
    fetch('http://localhost:5045/api/Users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message && data.message === 'Inicio de sesión exitoso') {
          // Guarda al usuario en localStorage
          const user = { nombre: data.user.nombre, email: data.user.email };
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);  // Actualiza el estado con el usuario autenticado
          setIsAuthenticated(true);  // Marca al usuario como autenticado
          onClose(); // Cierra el formulario

          // Redirige a la página de la tienda
          window.location.href = '/tienda';  // Asegúrate de que esta URL sea correcta
        } else {
          setErrorMessage(data.message || 'Error desconocido');
        }
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Hubo un problema al iniciar sesión');
        setIsSubmitting(false);
      });
  };

  return (
    <div className="login-page">
      <h1>Iniciar sesión en ByteStore</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" disabled={isSubmitting}>Iniciar sesión</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}

export default LoginPage;
