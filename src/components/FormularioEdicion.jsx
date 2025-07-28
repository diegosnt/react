import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import Swal from 'sweetalert2';

function FormularioEdicion({ }) {
  const { user } = useAuthContext();
  const {obtenerProducto, productoEncontrado, editarProducto} = useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  if(user !== 'admin'){
    return(
      <Navigate to="/login" replace />
    )
  }

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        await obtenerProducto(id);
      } catch (err) {
        setError(err.toString());
      } finally {
        setCargando(false);
      }
    };
    cargarProducto();
  }, [id, obtenerProducto]);

  useEffect(() => {
    if (productoEncontrado && productoEncontrado.id === id) {
      setProducto(productoEncontrado);
    }
  }, [productoEncontrado, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto?.name?.trim()) {
      return "El nombre es obligatorio.";
    }
    if (!producto?.price || producto.price <= 0) {
      return "El precio debe ser mayor a 0.";
    }
    if (!producto?.description?.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto?.imagen?.trim()) {
      return "La url de la imagen no debe estar vacía";
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mensajeError = validarFormulario();
    if (mensajeError === true) {
      try {
        await editarProducto(producto);
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'El producto se ha actualizado correctamente.',
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar el producto.',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: mensajeError,
      });
    }
  };

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <div className="formulario-container">
      <form className="formulario-producto" onSubmit={handleSubmit}>
        <h2>Editar Producto</h2>
        <div className="formulario-grupo">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={producto?.name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formulario-grupo">
          <label>URL de la Imagen</label>
          <input
            type="text" name="imagen" value={producto?.imagen || ''} onChange={handleChange} required/>
        </div>
        <div className="formulario-grupo">
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={producto?.price || ''}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div className="formulario-grupo">
          <label>Descripción:</label>
          <textarea
            name="description"
            value={producto?.description || ''}
            onChange={handleChange}
            required
          />
        </div>
        <button className="formulario-boton" type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
}

export default FormularioEdicion
