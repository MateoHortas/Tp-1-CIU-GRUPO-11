import { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import {
  FiSun,
  FiMoon,
  FiShoppingCart,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { TemaContext } from "../context/TemaContext";
import { CarritoContext } from "../context/CarritoContext";
import { LoginContext } from "../context/LoginContext";
import { useAnimarCarrito } from "../hooks/useAnimarCarrito";
import logoTriatlon from "../assets/logoTriatlon.png";
import "../style/Navbar.css";

function Navigation() {
  const { modoOscuro, cambiarTema } = useContext(TemaContext);

  const { cantidadCarrito } = useContext(CarritoContext);

  const { usuario, logout } = useContext(LoginContext);

  const animar = useAnimarCarrito(cantidadCarrito);

  const [expandido, setExpandido] = useState(false);

  const cerrarMenu = () => setExpandido(false);

  const alternarTema = () => {
    cambiarTema();
    cerrarMenu();
  };

  const manejarLogout = () => {
    logout();
    cerrarMenu();
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="shadow-sm"
      expanded={expandido}
      onToggle={setExpandido}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="brand-container"
          onClick={cerrarMenu}
        >
          <img src={logoTriatlon} alt="Logo" className="brand-logo" />
          <div className="brand-text-container">
            <span className="brand-text-main">Triatlon</span>
            <span className="brand-text-sub">Calzados</span>
          </div>
        </Navbar.Brand>

        <div className="carrito-flotante-container">
          <Nav.Link
            as={NavLink}
            to="/carrito"
            onClick={cerrarMenu}
            className={`btn-nav-icono boton-carrito ${animar ? "animar-carrito" : ""}`}
            aria-label="Carrito de compras"
          >
            <FiShoppingCart strokeWidth={1.8} />

            {cantidadCarrito  > 0 && (
              <span className="numero-carrito">{cantidadCarrito }</span>
            )}
          </Nav.Link>
        </div>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="menu-principal mx-auto" onClick={cerrarMenu}>
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

          <Nav className="btn-nav-container">
            <button
              className="btn-nav-icono"
              aria-label={
                modoOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
              }
              onClick={alternarTema}
            >
              {modoOscuro ? (
                <FiSun strokeWidth={1.8} />
              ) : (
                <FiMoon strokeWidth={1.8} />
              )}
            </button>

            {usuario ? (
              // Si el usuario está conectado: muestra su nombre y botón para salir
              <div className="user-logged-container">
                <span className="user-logged-text">
                  Hola, <span className="user-name">{usuario.nombre}</span> !
                </span>
                <button
                  onClick={manejarLogout}
                  className="btn-nav-icono btn-logout"
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                >
                  <FiLogOut strokeWidth={1.8} />
                </button>
              </div>
            ) : (
              // Si no hay nadie conectado: muestra el enlace clásico para ir al formulario
              <div className="user-auth-container">
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  onClick={cerrarMenu}
                  className="btn-nav-icono boton-login"
                  title="Iniciar sesión"
                  aria-label="Iniciar sesión"
                >
                  <FiUser strokeWidth={1.8} />
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
