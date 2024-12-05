import React from 'react';

function ProductList({ productos, categorias, error }) {
  // Crear un objeto con las categorías indexadas por ID para facilitar la búsqueda
  const categoriasPorId = categorias.reduce((acc, categoria) => {
    acc[categoria.categoriaID] = categoria;
    return acc;
  }, {});

  return (
    <div className="product-list">
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!error && productos.length === 0 && <p>Cargando productos...</p>}
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <div>
              <strong>{producto.nombre}</strong>
              <p>Precio: ${producto.precio}</p>
              <p>Stock: {producto.stock}</p>
              <p>Categoría: {categoriasPorId[producto.categoriaID]?.nombre || 'Sin categoría'}</p>
              
              {/* Mostrar imagen del producto */}
              {producto.imagenUrl && (
                <img 
                  src={producto.imagenUrl} 
                  alt={producto.nombre} 
                  style={{ width: '200px', height: 'auto', borderRadius: '8px' }} 
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
