import { useState } from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import Home from './layouts/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ProductosContainer from './components/ProductosContainer';
import Carrito from './components/Carrito';
import About from './components/About';
import Contacto from './components/Contacto';
import ProductoDetalle from './components/ProductoDetalle';
import Admin from './components/Admin';
import Login from './components/Login';
import Login2 from './components/Login2';
import FormularioProducto from './components/FormularioProducto';
import FormularioEdicion from './components/FormularioEdicion';


function App() {
  return (
    <Router>
      <HelmetProvider>
        <div className="d-flex flex-column min-vh-100">
          <Nav/>
          <ToastContainer theme="colored" autoClose={3000} />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/login' element={<Login2/>}/> 
              <Route path="/productos" element={<ProductosContainer/>} />
              <Route path="/carrito" element={<Carrito /> }/>      
              <Route path="/nosotros" element={<About />} />
              <Route path="/contacto" element={<Contacto/>} />
              <Route path="/productos/:id" element={<ProductoDetalle/>} />
              <Route path='/admin' element={<Admin/>} />
              <Route path="/admin/agregarProductos" element={<FormularioProducto/>}/>
              <Route path="/admin/editarProducto/:id" element={<FormularioEdicion/>}/>
            </Routes>
          </main>
          <Footer />
        </div>
      </HelmetProvider>
    </Router>
  )
}

export default App;