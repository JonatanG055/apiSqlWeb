import React from 'react';

function Section({ section, setCategoriaSeleccionada, categorias }) {
  return (
    <div className="section">
      {section === 'home' && (
        <>
          <h1>Bienvenidos a la tienda</h1>
          <div className="categorias">
            {categorias.map((categoria) => (
              <button 
                key={categoria.categoriaID} 
                onClick={() => setCategoriaSeleccionada(categoria.categoriaID)}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>
        </>
      )}
      {section === 'about' && <h1>Sobre mí</h1>}
      {section === 'services' && <h1>Servicios</h1>}
      {section === 'gallery' && <h1>Galería</h1>}
      {section === 'contact' && <h1>Contacto</h1>}
    </div>
  );
}

export default Section;
