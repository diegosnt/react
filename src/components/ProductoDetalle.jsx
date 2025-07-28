import { useContext, useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { dispararSweetBasico } from "../assets/SweetAlert";
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
    dispararSweetBasico(
      "Producto Agregado",
      "El producto fue agregado al carrito con éxito",
      "success",
      "Cerrar"
    );
    agregarAlCarrito({ ...producto, cantidad });
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  const dispararEliminar = () => {
    const promise = eliminarProducto(id);
    if (promise) {
      promise
        .then(() => {
          navegar("/productos");
        })
        .catch((error) => {
          dispararSweetBasico("Error", "No se pudo eliminar el producto.", "error", "Cerrar");
        });
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
  );
}

export default ProductoDetalle;
