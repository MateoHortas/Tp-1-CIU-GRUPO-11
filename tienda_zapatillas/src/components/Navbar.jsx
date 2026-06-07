import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { FiSun, FiMoon, FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi"; // 🌟 Importamos íconos de usuario
import { TemaContext } from "../context/TemaContext";
import { CarritoContext } from "../context/CarritoContext";
import { LoginContext } from "../context/LoginContext"; // 🌟 Importamos tu nuevo contexto
import { useAnimarCarrito } from "../hooks/useAnimarCarrito";
//import logoTriatlon from "../assets/logo.png";

import "../style/Navbar.css";

function Navigation() {
  const { modoOscuro, cambiarTema } = useContext(TemaContext);
  const { cantidadCarrito } = useContext(CarritoContext);
  const { usuario, logout } = useContext(LoginContext); // 🌟 Consumimos el estado global del usuario

  const animar = useAnimarCarrito(cantidadCarrito);

  return (
    <Navbar expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-container">
          <img
            // --- AGREGAR LOGO ---
            //src={logoTriatlon}
            alt="Logo"
            width="40"
            height="40"
            className="brand-logo"
          />
          <div className="brand-text-container">
            <span className="brand-text-main">Triatlon</span>
            <span className="brand-text-sub">Calzados</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="menu-principal mx-auto">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/productos">
              Productos
            </Nav.Link>

            <Nav.Link as={NavLink} to="/nosotros">
              Nosotros
            </Nav.Link>
             <Nav.Link as={NavLink} to="/contacto">
              Contacto
            </Nav.Link>
          </Nav>

          <Nav className="btn-nav-container align-items-center gap-2">
            {/* Botón de Modo Oscuro */}
            <button
              className="btn-nav-icono"
              aria-label="Modo oscuro"
              onClick={cambiarTema}
            >
              {modoOscuro ? (
                <FiSun strokeWidth={1.8} />
              ) : (
                <FiMoon strokeWidth={1.8} />
              )}
            </button>

            {/* Botón del Carrito */}
            <Nav.Link
              as={NavLink}
              to="/carrito"
              className={`btn-nav-icono boton-carrito me-1 ${animar && "animar-carrito"}`}
              aria-label="Carrito de compras"
            >
              <FiShoppingCart strokeWidth={1.8} />

              {cantidadCarrito > 0 && (
                <span className="numero-carrito">{cantidadCarrito}</span>
              )}
            </Nav.Link>

            
            {usuario ? (
              // Si el usuario está conectado: muestra su nombre y botón para salir
              <div className="d-flex align-items-center gap-2 ms-2 user-logged-container">
                <span className="small fw-semibold text-secondary d-none d-sm-inline">
                  ¡Hola, <span className="text-dark">{usuario.nombre}</span>!
                </span>
                <button 
                  onClick={logout} 
                  className="btn-nav-icono text-danger" 
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                >
                  <FiLogOut strokeWidth={1.8} />
                </button>
              </div>
            ) : (
              // Si no hay nadie conectado: muestra el enlace clásico para ir al formulario
              <Nav.Link
                as={NavLink}
                to="/login"
                className="btn-nav-icono"
                title="Iniciar sesión"
                aria-label="Iniciar sesión"
              >
                <FiUser strokeWidth={1.8} />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;