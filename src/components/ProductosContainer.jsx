import { useEffect, useState } from "react";
import { useProductosContext } from "../contexts/ProductosContext";
import Card from "./Card";

function ProductosContainer() {
  const { productos, obtenerProductos } = useProductosContext();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="container mt-4">
      <div className="row">
        {productos.map((producto) => (
          <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Card producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductosContainer;
