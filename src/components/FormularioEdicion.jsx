import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import { toast } from 'react-toastify';
import { Helmet } from "react-helmet-async";
import { FaSave } from 'react-icons/fa';
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
        toast.success('El producto se ha actualizado correctamente.');
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
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning" role="alert">
          Producto no encontrado.
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Bits & Books - Editando: ${producto?.name || 'Producto'}`}</title>
        <meta name="description" content={`Formulario para editar el producto ${producto?.name || ''}.`} />
      </Helmet>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow">
              <h2 className="text-center mb-4">Editar Producto</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={producto?.name || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imagen" className="form-label">URL de la Imagen</label>
                  <input
                    type="text" id="imagen" name="imagen" className="form-control" value={producto?.imagen || ''} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Precio:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-control"
                    value={producto?.price || ''}
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
                    rows="3"
                    value={producto?.description || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2" type="submit">
                  <FaSave />
                  <span>Actualizar Producto</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormularioEdicion
