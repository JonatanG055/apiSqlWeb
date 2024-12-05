import React from 'react';
import './Sidebar.css';

function Sidebar({ currentSection, navigateToSection }) {
  return (
    <aside className="sidebar">
      <ul className="links">
        <li
          onClick={() => navigateToSection('home')}
          className={currentSection === 'home' ? 'activeLink' : ''}
        >
          <span className="icon">🏠</span> Home
        </li>
        <li
          onClick={() => navigateToSection('services')}
          className={currentSection === 'services' ? 'activeLink' : ''}
        >
          <span className="icon">💼</span> Servicios
        </li>
        <li
          onClick={() => navigateToSection('gallery')}
          className={currentSection === 'gallery' ? 'activeLink' : ''}
        >
          <span className="icon">🖼️</span> Galería
        </li>
        <li
          onClick={() => navigateToSection('contact')}
          className={currentSection === 'contact' ? 'activeLink' : ''}
        >
          <span className="icon">📞</span> Contacto
        </li>
        <li
          onClick={() => navigateToSection('about')}
          className={currentSection === 'about' ? 'activeLink' : ''}
        >
          <span className="icon">👤</span> Quiénes Somos
        </li>
        <li
          onClick={() => navigateToSection('terms')}
          className={currentSection === 'terms' ? 'activeLink' : ''}
        >
          <span className="icon">📜</span> Términos y Condiciones
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar; // Asegúrate de que esta línea esté presente
