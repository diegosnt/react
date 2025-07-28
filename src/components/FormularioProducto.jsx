import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useProductosContext } from '../contexts/ProductosContext';
import "../styles/Global.css";



function FormularioProducto({}) {
  const {agregarProducto} = useProductosContext();
  const {user} = useAuthContext();

  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ""
  });

  const validarFormulario = () => {
    if (!producto.name.trim()) {
      return "El nombre es obligatorio.";
    }
    if (!producto.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    if (!producto.description.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto.imagen.trim()) {
      return "La url de la imagen no debe estar vacía";
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mensajeError = validarFormulario();
    if (mensajeError !== true) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la carga del producto',
        text: mensajeError,
      });
      return;
    }

    try {
      await agregarProducto(producto);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Producto agregado correctamente',
      });
      setProducto({ name: '', price: '', description: '', imagen: '' });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un problema al agregar el producto',
        text: error,
      });
    }
  };

  if(user !== 'admin'){
    return(
      <Navigate to="/login" replace/>
    )
  }

  return ( 
    <div className="formulario-container">
      <form className="formulario-producto" onSubmit={handleSubmit}>
        <h2>Agregar Producto</h2>
        <div className="formulario-grupo">
          <label>Nombre:</label>
          <input
            type="text" name="name" value={producto.name} onChange={handleChange} required/>
        </div>
        <div className="formulario-grupo">
          <label>URL de la Imagen</label>
          <input
            type="text" name="imagen" value={producto.imagen} onChange={handleChange} required/>
        </div>
        <div className="formulario-grupo">
          <label>Precio:</label>
          <input type="number" name="price" value={producto.price} onChange={handleChange} required
            min="0"/>
        </div>
        <div className="formulario-grupo">
          <label>Descripción:</label>
          <textarea
            name="description"
            value={producto.description}
            onChange={handleChange}
            required
          />
        </div>
        <button className="formulario-boton" type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default FormularioProducto;
  