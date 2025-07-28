import "../styles/Global.css";
import { useContext, useEffect, useState } from "react";
import CarritoCard from "./CarritoCard.jsx";
import { Navigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";

export default function Carrito() {

  const {user} = useAuthContext();
  const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useContext(CarritoContext);
  console.log("Productos: " + productosCarrito);

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

  console.log("Total: " + total);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (productosCarrito.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.2em' }}>Carrito vacio</p>;
  }

  return (
    <div className="carrito-conteiner">
      <button className="vaciar-carrito-btn" onClick={funcionDisparadora2}>
        Vaciar carrito
      </button>
      <div className="carrito-titulos">
        <h2 className="carrito-titulo-producto"> Producto </h2>
        <h2 className="carrito-titulo-descripcion">Descripción</h2>
        <h2> </h2>
        <h2> Cantidad </h2>
        <h2> Precio unitario </h2>
        <h2> Sub total </h2>
        <h2> </h2>
      </div>

      {productosCarrito.map((producto) => (
        <CarritoCard
          key={producto.id}
          producto={producto}
          funcionDisparadora={funcionDisparadora}
        />
      ))}
      {total > 0 ? (
        <span className="total-a-pagar">
          Total a pagar: ${total.toFixed(2)}
        </span>
      ) : (
        null
      )}
    </div>
  );
}
