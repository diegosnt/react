import { useContext, useEffect, useState } from "react";
import CarritoCard from "./CarritoCard.jsx";
import { Navigate, Link } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function Carrito() {
  const { user } = useAuthContext();
  const { productosCarrito, vaciarCarrito, borrarProductoCarrito } =
    useContext(CarritoContext);

  const total = productosCarrito.reduce(
    (subTotal, producto) => subTotal + producto.price * producto.cantidad,
    0
  );

  function funcionDisparadora(id) {
    borrarProductoCarrito(id);
  }

  function funcionDisparadora2() {
    vaciarCarrito();
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (productosCarrito.length === 0) {
    return (
      <div className="container text-center py-5">
        <div className="card p-5">
          <h2 className="card-title">Tu carrito está vacío</h2>
          <p className="lead text-muted">Añade productos para verlos aquí.</p>
          <div className="mt-4">
            <Link to="/productos" className="btn btn-primary btn-lg">
              Ver Productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Mi Carrito</h1>
        <button
          className="btn btn-outline-danger"
          onClick={funcionDisparadora2}
        >
          Vaciar carrito
        </button>
      </div>

      <div className="row fw-bold border-bottom pb-2 mb-3 d-none d-lg-flex text-muted">
        <div className="col-lg-5">Producto</div>
        <div className="col-lg-7">
          <div className="row">
            <div className="col-3 text-center">Precio Unit.</div>
            <div className="col-3 text-center">Cantidad</div>
            <div className="col-3 text-center">Subtotal</div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>

      {productosCarrito.map((producto) => (
        <CarritoCard
          key={producto.id}
          producto={producto}
          funcionDisparadora={funcionDisparadora}
        />
      ))}

      <div className="d-flex justify-content-end align-items-center mt-4">
        <h3 className="me-4 mb-0">
          Total: <span className="fw-bold">${total.toFixed(2)}</span>
        </h3>
        <button className="btn btn-success btn-lg">Proceder al Pago</button>
      </div>
    </div>
  );
}
