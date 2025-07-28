import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useProductosContext } from '../contexts/ProductosContext';
import { Helmet } from 'react-helmet-async';
import { FaPlus } from 'react-icons/fa';

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
      toast.success('Producto agregado correctamente');
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
    <>
      <Helmet>
        <title>Bits & Books - Agregar Producto</title>
        <meta name="description" content="Formulario para agregar un nuevo producto al catálogo de Bits & Books." />
      </Helmet>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card p-4 shadow-sm">
              <h2 className="text-center mb-4">Agregar Producto</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre:</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={producto.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imagen" className="form-label">URL de la Imagen</label>
                  <input
                    id="imagen"
                    type="text"
                    name="imagen"
                    className="form-control"
                    value={producto.imagen}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Precio:</label>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    className="form-control"
                    value={producto.price}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descripción:</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows="4"
                    value={producto.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2" type="submit">
                  <FaPlus />
                  <span>Agregar Producto</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormularioProducto;