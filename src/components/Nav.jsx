import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext";
import "../styles/Global.css";
import { useAuthContext } from "../contexts/AuthContext";


function Nav({}) {

    const {productosCarrito, vaciarCarrito} = useContext(CarritoContext)
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        vaciarCarrito();
        logout();
        navigate('/login');
    }

    return ( 
        <nav className="nav">  
            <ul className="navList">  
                <li><Link to="/" className="navLink">Inicio</Link></li>  
                <li><Link to="/productos" className="navLink">Productos</Link></li>   
                <li><Link to="/nosotros" className="navLink">Nosotros</Link></li>  
                <li><Link to="/contacto" className="navLink">Contacto</Link></li>  
                {user !== 'admin' && (
                    <li>
                        {(user && productosCarrito.length === 0) ? (
                            <span className="navLink disabled-link">
                                Carrito
                            </span>
                        ) : (
                            <Link to="/carrito" className="navLink">
                                Carrito {productosCarrito.length > 0 && <span className="cart-count">{productosCarrito.length}</span>}
                            </Link>
                        )}
                    </li>
                )}
                {!user ? (
                    <>
                        {/* <li><Link to="/admin" className="navLink">Admin</Link></li> */}
                        <li><Link to="/login" className="navLink">Login</Link></li>
                    </>
                ) : (
                    <>
                        {user === 'admin' && <li><Link to="/admin/agregarProductos" style={{ color: "white", textDecoration: "none" }}>Agregar productos</Link></li>}
                        <li>
                            <button onClick={handleLogout} className="navLink" style={user === 'admin' ? {
                                backgroundColor: 'red',
                                color: 'white',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                font: 'inherit'
                            } : {
 
                                background: 'blue',
                                color: 'white',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                font: 'inherit'

                            }}>
                                {user === 'admin' ? 'Cerrar sesión Admin' : 'Cerrar sesión User'}
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );  
}


export default Nav; 