import "../styles/Global.css";

import { useState } from "react";

import { dispararSweetBasico } from "../assets/SweetAlert";
import { Link } from "react-router-dom";

function Card({ producto }) {
  return (
    <div className="producto-card">
      <h2 className="producto-name">{producto.name}</h2>
      <Link to={"/productos/" + producto.id}>
        <img className="producto-image" src={producto.imagen}></img>
      </Link>
      <p className="producto-price"> $ {producto.price}</p>
      <Link to={"/productos/" + producto.id}>
        <button className="boton-detalles">Ver Detalles</button>
      </Link>
    </div>
  );
}

export default Card;
