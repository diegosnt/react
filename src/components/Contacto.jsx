import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/Global.css';

function Contacto() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos.',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: '¡Consulta Enviada!',
            text: 'Gracias por tu mensaje. Nos pondremos en contacto contigo a la brevedad.',
        });

        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="formulario-container">
            <form className="formulario-producto" onSubmit={handleSubmit}>
                <h2>Formulario de Contacto</h2>
                <div className="formulario-grupo">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="formulario-grupo">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="formulario-grupo">
                    <label htmlFor="message">Mensaje:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className="formulario-boton" type="submit">Enviar Consulta</button>
            </form>
        </div>
    );
}

export default Contacto;