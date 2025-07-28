import { Link } from "react-router-dom";

function Card({ producto }) {
  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/productos/${producto.id}`}>
        <img
          className="card-img-top"
          src={producto.imagen}
          alt={producto.name}
          style={{ height: "220px", objectFit: "cover" }}
        />
      </Link>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.name}</h5>
        <p className="card-text fw-bold">$ {producto.price}</p>
        <Link
          to={`/productos/${producto.id}`}
          className="btn btn-primary mt-auto"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

export default Card;
