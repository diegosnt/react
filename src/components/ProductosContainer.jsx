import { useEffect, useState } from "react";
//import products from "../assets/data/products.json"; // Se importa el JSON
import "../styles/Global.css";
import Card from "./Card";

function ProductosContainer({ functionCarrito }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  {
    useEffect(() => {
      // se consumen los proctos de mockapi
      fetch("https://68333518c3f2222a8cb54b35.mockapi.io/productos")
        .then((respuesta) => respuesta.json())
        .then((datos) => {
          console.log(datos);
          //debugger;
          setProductos(datos);
          setCargando(false);
        })
        .catch((error) => {
          console.log("Error", error);
          setError("Hubo un problema al cargar los productos.");
          setCargando(false);
        });
    }, []);
  }

  if (cargando) {
    return <p className="cargando">Cargando productos...</p>;
  } else if (error) {
    return <p>{error}</p>;
  } else {
    return (
      <div className="productos-conteiner">
        {productos.map((producto) => (
          <Card key={producto.id} producto={producto} />
        ))}
      </div>
    );
  }
}

export default ProductosContainer;
