function CarritoCard({ producto, funcionDisparadora }) {
  function borrarDelCarrito() {
    funcionDisparadora(producto.id);
  }

  return (
    <div className="row align-items-center py-3 border-bottom">
      <div className="col-12 col-lg-5 d-flex align-items-center mb-3 mb-lg-0">
        <img
          src={producto.imagen}
          alt={producto.name}
          className="img-fluid rounded me-3"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
        <div>
          <p className="fw-bold mb-0">{producto.name}</p>
          <p className="text-muted small d-none d-md-block">
            {producto.description}
          </p>
        </div>
      </div>

      <div className="col-12 col-lg-7">
        <div className="row align-items-center">
          <div className="col-3 text-center">
            $ {Number(producto.price).toFixed(2)}
          </div>
          <div className="col-3 text-center">{producto.cantidad}</div>
          <div className="col-3 text-center fw-bold">
            $ {(producto.cantidad * producto.price).toFixed(2)}
          </div>
          <div className="col-3 text-end">
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={borrarDelCarrito}
              title="Eliminar producto"
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarritoCard;
