import { useEffect, useState } from "react";
import { useProductosContext } from "../contexts/ProductosContext";
import Card from "./Card";
import { Helmet } from "react-helmet-async";
import Paginacion from "./Paginacion";

function ProductosContainer() {
  const { productos, obtenerProductos } = useProductosContext();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productosPorPagina] = useState(8);
  
  useEffect(() => {
    if (productos.length > 0) {
      setCargando(false);
      return;
    }

    const cargarProductos = async () => {
      try {
        await obtenerProductos();
      } catch (err) {
        setError("Hubo un problema al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, [obtenerProductos, productos.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [terminoBusqueda]);

  const productosFiltrados = productos.filter(
    (producto) =>
      producto.name.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      producto.description.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productosPorPagina;
  const indexOfFirstProduct = indexOfLastProduct - productosPorPagina;
  const currentProducts = productosFiltrados.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (cargando) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">{error}</div>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Bits & Books - Catálogo de Productos</title>
        <meta name="description" content="Explora nuestro catálogo completo de libros de informática en Bits & Books." />
      </Helmet>
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos por nombre o descripción..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          {currentProducts.length > 0 ? (
            currentProducts.map((producto) => (
              <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <Card producto={producto} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-info text-center">
                No se encontraron productos que coincidan con tu búsqueda.
              </div>
            </div>
          )}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <Paginacion productosPorPagina={productosPorPagina} totalProductos={productosFiltrados.length} paginate={paginate} currentPage={currentPage} />
        </div>
      </div>
    </>
  );
}

export default ProductosContainer;
