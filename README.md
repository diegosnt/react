# Bits & Books - Proyecto Final del Curso de React

Este proyecto es la entrega final para el curso de **React** impartido por el plan **Buenos Aires Aprende - Talento Tech**.

## Descripción del Proyecto

**Bits & Books** es una aplicación de e-commerce completamente funcional, desarrollada con React. La aplicación simula una tienda online de libros de informática, permitiendo a los usuarios navegar por el catálogo, ver detalles de productos, agregarlos a un carrito de compras y simular un proceso de compra.

El proyecto cuenta con un sistema de autenticación que diferencia entre usuarios regulares y administradores. Los administradores tienen acceso a un panel especial desde donde pueden gestionar los productos de la tienda (Crear, Leer, Actualizar y Eliminar - CRUD).

## Características y Tecnologías Implementadas

*   **React y Vite:** Creación y configuración del proyecto utilizando Vite para un desarrollo rápido y eficiente.
*   **Arquitectura de Componentes:** Desarrollo basado en componentes funcionales y JSX.
*   **Gestión de Estado:**
    *   `useState` para el manejo de estado local en los componentes.
    *   `Context API` (`useContext`) para un manejo de estado global, gestionando la autenticación de usuarios y el contenido del carrito de compras.
*   **Routing con React Router:**
    *   Configuración de un sistema de rutas para la navegación entre las distintas páginas de la aplicación.
    *   Uso de rutas dinámicas para mostrar los detalles de cada producto.
    *   Implementación de rutas protegidas para el panel de administración.
*   **Operaciones Asíncronas:**
    *   `useEffect` para consumir datos de una API (MockAPI) y manejar los ciclos de vida de los componentes.
*   **CRUD de Productos:**
    *   Funcionalidad completa para que el administrador pueda crear, leer, actualizar y eliminar productos.
    *   Formularios con validaciones para la carga y edición de datos.
*   **Autenticación de Usuarios:**
    *   Formulario de login con validación de credenciales para roles de `usuario` y `admin`.
*   **Estilización Profesional:**
    *   Uso intensivo de la librería **React-Bootstrap** para crear una interfaz de usuario moderna, atractiva y completamente responsive.
*   **Notificaciones y Feedback:**
    *   Integración de **SweetAlert2** para proporcionar feedback visual al usuario tras realizar acciones importantes (ej. agregar al carrito, eliminar un producto).

## Cómo Ejecutar el Proyecto

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-repositorio>
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```