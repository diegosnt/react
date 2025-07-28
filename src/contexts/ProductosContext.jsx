import React, { createContext, useState, useContext } from "react";
import Swal from "sweetalert2";
// Crear el contexto de de los productos
const ProductosContext = createContext();
export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [productoEncontrado, setProductoEncontrado] = useState([]);

  async function obtenerProductos() {
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
  }

  const agregarProducto = async (producto) => {
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
      return await respuesta.json();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  async function obtenerProducto(id) {
    try {
      const respuesta = await fetch(
        "https://68333518c3f2222a8cb54b35.mockapi.io/productos"
      );
      if (!respuesta.ok) {
        throw new Error("Hubo un error al obtener el producto.");
      }
      const datos = await respuesta.json();
      const producto = datos.find((item) => item.id === id);
      if (producto) {
        setProductoEncontrado(producto);
        return producto;
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (err) {
      console.error("Error:", err.message);
      throw err.message === "Producto no encontrado"
        ? "Producto no encontrado"
        : "Hubo un error al obtener el producto.";
    }
  }

  async function editarProducto(producto) {
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
      return await respuesta.json();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  const eliminarProducto = async (id) => {
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
  };

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
