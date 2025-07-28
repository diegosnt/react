import { useContext, useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

import { Helmet } from "react-helmet-async";
import { CarritoContext } from "../contexts/CarritoContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext.jsx";

function ProductoDetalle({}) {
  const navegar = useNavigate();
  const { user } = useAuthContext();
  const { obtenerProducto, eliminarProducto } = useProductosContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarProducto = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await obtenerProducto(id);
      setProducto(data);
    } catch (err) {
      setError(err.message || "Hubo un error al obtener el producto.");
    } finally {
      setCargando(false);
    }
  }, [id, obtenerProducto]);

  useEffect(() => {
    if (id) {
      cargarProducto();
    }
  }, [id, cargarProducto]);

  function funcionCarrito() {
    if (cantidad < 1) return;
    toast.success('¡Producto agregado al carrito!');
    agregarAlCarrito({ ...producto, cantidad });
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  const dispararEliminar = async () => {
    try {
      const fueEliminado = await eliminarProducto(id);
      if (fueEliminado) {
        navegar("/productos");
      }
    } catch (error) {
      // El error ya es manejado por SweetAlert en el contexto
      console.error("Fallo al eliminar el producto:", error);
    }
  };

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          Producto no encontrado.
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Bits & Books - ${producto.name}`}</title>
        <meta name="description" content={producto.description} />
        <link rel="canonical" href={window.location.href} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={`Bits & Books - ${producto.name}`} />
        <meta property="og:description" content={producto.description} />
        <meta property="og:image" content={producto.imagen} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={`Bits & Books - ${producto.name}`} />
        <meta property="twitter:description" content={producto.description} />
        <meta property="twitter:image" content={producto.imagen} />
      </Helmet>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <img src={producto.imagen} alt={producto.name} className="img-fluid rounded shadow-sm" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center ps-md-5">
            <h1 className="display-5 fw-bold">{producto.name}</h1>
            <p className="lead text-muted">{producto.description}</p>
            <p className="h2 my-3">${producto.price}</p>
            <div className="mb-4">
              <label htmlFor="cantidad" className="form-label">Cantidad:</label>
              <div className="input-group" style={{ maxWidth: "150px" }}>
                <button className="btn btn-outline-secondary" type="button" onClick={restarContador}>-</button>
                <input type="text" id="cantidad" className="form-control text-center" value={cantidad} readOnly />
                <button className="btn btn-outline-secondary" type="button" onClick={sumarContador}>+</button>
              </div>
            </div>
            {user === 'admin' ? (
              <div className="d-flex gap-2">
                <Link to={`/admin/editarProducto/${id}`} className="btn btn-secondary">Editar Producto</Link>
                <button onClick={dispararEliminar} className="btn btn-danger">Eliminar Producto</button>
              </div>
            ) : (
              <button onClick={funcionCarrito} className="btn btn-primary btn-lg">Agregar al carrito</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductoDetalle;
