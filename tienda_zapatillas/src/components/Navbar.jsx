import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router";
import { FiSun, FiMoon, FiShoppingCart } from "react-icons/fi";
import { TemaContext } from "../context/TemaContext";
import { CarritoContext } from "../context/CarritoContext";
import { useAnimarCarrito } from "../hooks/useAnimarCarrito";
//import logoTriatlon from "../assets/logo.png";

import "../style/Navbar.css";

function Navigation() {
  const { modoOscuro, cambiarTema } = useContext(TemaContext);

  const { cantidadCarrito } = useContext(CarritoContext);

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

            <Nav.Link as={NavLink} to="/contacto">
              Contacto
            </Nav.Link>
          </Nav>

          <Nav className="btn-nav-container">
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

            <Nav.Link
              as={NavLink}
              to="/carrito"
              className={`btn-nav-icono boton-carrito ${animar && "animar-carrito"}`}
              aria-label="Carrito de compras"
            >
              <FiShoppingCart strokeWidth={1.8} />

              {cantidadCarrito > 0 && (
                <span className="numero-carrito">{cantidadCarrito}</span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
