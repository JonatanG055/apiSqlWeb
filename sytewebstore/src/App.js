import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ProductList from './components/ProductList';
import Section from './components/Section';
import RegisterButton from './components/RegisterButton';
import RegisterPage from './components/RegisterPage';
import LoginButton from './components/LoginButton';
import LoginPage from './components/LoginPage';

function App() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);
  const [currentSection, setCurrentSection] = useState('home');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    fetch("http://localhost:5045/api/products")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => setError(error.message));

    fetch("http://localhost:5045/api/products/categories")
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) => setError(error.message));
  }, []);

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((producto) => producto.categoriaID === categoriaSeleccionada)
    : productos;

  const navigateToSection = (section) => {
    setCurrentSection(section);
  };

  const handleShowRegisterForm = () => {
    setShowRegisterForm(true);
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {!isAuthenticated && (
        <div className="button-container">
          <RegisterButton onClick={handleShowRegisterForm} />
          <LoginButton onClick={handleShowLoginForm} />
        </div>
      )}

      <Sidebar
        currentSection={currentSection}
        navigateToSection={navigateToSection}
        setCategoriaSeleccionada={setCategoriaSeleccionada}
        categorias={categorias}
      />

      <main className="content">
        {isAuthenticated ? (
          <div>
            <p>Bienvenido, {user.nombre}</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        ) : null}

        {showRegisterForm && !isAuthenticated && (
          <RegisterPage onClose={handleCloseRegisterForm} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
        )}

        {showLoginForm && !isAuthenticated && (
          <LoginPage onClose={handleCloseLoginForm} setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
        )}

        {!showRegisterForm && !showLoginForm && (
          <>
            <Section section={currentSection} setCategoriaSeleccionada={setCategoriaSeleccionada} categorias={categorias} />
            <ProductList productos={productosFiltrados} categorias={categorias} error={error} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
