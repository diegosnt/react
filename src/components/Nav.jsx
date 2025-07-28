import { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav as BootstrapNav, Button } from 'react-bootstrap';
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";

function Nav() {
    const { productosCarrito, vaciarCarrito } = useContext(CarritoContext);
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        vaciarCarrito();
        logout();
        navigate("/login");
    };

    const totalItemsEnCarrito = productosCarrito.reduce((total, producto) => total + producto.cantidad, 0);

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" collapseOnSelect>
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Mi Tienda</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <BootstrapNav className="me-auto">
                        <BootstrapNav.Link as={NavLink} to="/" end>Inicio</BootstrapNav.Link>
                        <BootstrapNav.Link as={NavLink} to="/productos">Productos</BootstrapNav.Link>
                        <BootstrapNav.Link as={NavLink} to="/nosotros">Nosotros</BootstrapNav.Link>
                        <BootstrapNav.Link as={NavLink} to="/contacto">Contacto</BootstrapNav.Link>
                        {user === "admin" && (
                            <BootstrapNav.Link as={NavLink} to="/admin/agregarProductos">Agregar productos</BootstrapNav.Link>
                        )}
                    </BootstrapNav>
                    <BootstrapNav>
                        {user !== "admin" && (
                            <BootstrapNav.Link as={NavLink} to="/carrito" disabled={totalItemsEnCarrito === 0}>
                                Carrito
                                {totalItemsEnCarrito > 0 && <span className="badge bg-danger ms-1">{totalItemsEnCarrito}</span>}
                            </BootstrapNav.Link>
                        )}
                        {!user ? (
                            <Button as={Link} to="/login" variant="primary" className="ms-lg-2 mt-2 mt-lg-0">Login</Button>
                        ) : (
                            <Button onClick={handleLogout} variant={user === "admin" ? "danger" : "info"} className="ms-lg-2 mt-2 mt-lg-0">
                                {user === "admin" ? "Cerrar sesión Admin" : "Cerrar sesión"}
                            </Button>
                        )}
                    </BootstrapNav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Nav;