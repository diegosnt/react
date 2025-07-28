import React from 'react';

const Paginacion = ({ productosPorPagina, totalProductos, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProductos / productosPorPagina);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) {
    return null; // No mostrar paginación si solo hay una página o menos
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a onClick={(e) => { e.preventDefault(); paginate(currentPage - 1); }} href="#" className="page-link">
            Anterior
          </a>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={(e) => { e.preventDefault(); paginate(number); }} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <a onClick={(e) => { e.preventDefault(); paginate(currentPage + 1); }} href="#" className="page-link">
            Siguiente
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paginacion;