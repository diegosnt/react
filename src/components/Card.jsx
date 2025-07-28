import { Link } from "react-router-dom";

function Card({ producto }) {
  return (
    <div className="card h-100 shadow-sm">
      <Link to={`/productos/${producto.id}`}>
        <img
          className="card-img-top"
          src={producto.imagen}
          alt={producto.name}
          style={{ height: "160px", objectFit: "cover" }}
        />
      </Link>
      <div className="card-body d-flex flex-column p-2">
        <h6 className="card-title flex-grow-1" style={{fontSize: '0.9rem'}}>{producto.name}</h6>
        <p className="card-text fw-bold mb-2">$ {producto.price}</p>
        <Link
          to={`/productos/${producto.id}`}
          className="btn btn-primary btn-sm mt-auto"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

export default Card;
