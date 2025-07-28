import React, { createContext, useState, useContext, useCallback } from "react";
import Swal from "sweetalert2";

const ProductosContext = createContext();
export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  const obtenerProductos = useCallback(async () => {
    try {
      const respuesta = await fetch(
        "https://68333518c3f2222a8cb54b35.mockapi.io/productos"
      );
      if (!respuesta.ok) {
        throw new Error("Error al obtener los productos.");
      }
      const datos = await respuesta.json();
      setProductos(datos);
      return datos;
    } catch (error) {
      console.error("Error:", error.message);
      throw new Error("Hubo un problema al cargar los productos.");
    }
  }, []);

  const agregarProducto = useCallback(async (producto) => {
    try {
      const respuesta = await fetch(
        "https://68333518c3f2222a8cb54b35.mockapi.io/productos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(producto),
        }
      );
      if (!respuesta.ok) {
        throw new Error("Error al agregar el producto.");
      }
      const nuevoProducto = await respuesta.json();
      setProductos((prev) => [...prev, nuevoProducto]);
      return nuevoProducto;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }, []);

  const obtenerProducto = useCallback(async (id) => {
    try {
      const respuesta = await fetch(
        `https://68333518c3f2222a8cb54b35.mockapi.io/productos/${id}`
      );
      if (!respuesta.ok) {
        if (respuesta.status === 404) {
          throw new Error("Producto no encontrado");
        }
        throw new Error("Hubo un error al obtener el producto.");
      }
      const producto = await respuesta.json();
      setProductoEncontrado(producto);
      return producto;
    } catch (err) {
      console.error("Error:", err.message);
      throw err;
    }
  }, []);

  const editarProducto = useCallback(async (producto) => {
    try {
      const respuesta = await fetch(
        `https://68333518c3f2222a8cb54b35.mockapi.io/productos/${producto.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(producto),
        }
      );
      if (!respuesta.ok) {
        throw new Error("Error al actualizar el producto.");
      }
      const productoActualizado = await respuesta.json();
      setProductoEncontrado(productoActualizado);
      setProductos((prevProductos) =>
        prevProductos.map(p => p.id === productoActualizado.id ? productoActualizado : p)
      );
      return productoActualizado;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }, []);

  const eliminarProducto = useCallback(async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡eliminar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const respuesta = await fetch(
          `https://68333518c3f2222a8cb54b35.mockapi.io/productos/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!respuesta.ok) throw new Error("Error al eliminar");
        setProductos((prev) => prev.filter((p) => p.id !== id));
        await Swal.fire(
          "¡Eliminado!",
          "El producto ha sido eliminado.",
          "success"
        );
      } catch (error) {
        console.error(error.message);
        await Swal.fire(
          "Error",
          "Hubo un problema al eliminar el producto.",
          "error"
        );
        throw error;
      }
    }
  }, []);

  return (
    <ProductosContext.Provider
      value={{
        obtenerProductos,
        productos,
        agregarProducto,
        obtenerProducto,
        productoEncontrado,
        editarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}
export const useProductosContext = () => useContext(ProductosContext);
