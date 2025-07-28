import React, { createContext, useState } from 'react';
export const CarritoContext = createContext();
export function CarritoProvider({ children }) {
    const [productosCarrito, setProductosCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setProductosCarrito(currentCart => {
            const existingProductIndex = currentCart.findIndex(p => p.id === producto.id);
    
            if (existingProductIndex !== -1) {
                const updatedCart = [...currentCart];
                const existingProduct = updatedCart[existingProductIndex];
                updatedCart[existingProductIndex] = { ...existingProduct, cantidad: existingProduct.cantidad + producto.cantidad };
                return updatedCart;
            } else {
                return [...currentCart, producto];
            }
        });
    };    

    const vaciarCarrito = () => {
        setProductosCarrito([]);
    };

    function borrarProductoCarrito(id){
        const nuevoCarrito = productosCarrito.filter((p) => p.id !== id);
        setProductosCarrito(nuevoCarrito);
    }

    return (
        <CarritoContext.Provider value={{ productosCarrito, agregarAlCarrito, vaciarCarrito, borrarProductoCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}