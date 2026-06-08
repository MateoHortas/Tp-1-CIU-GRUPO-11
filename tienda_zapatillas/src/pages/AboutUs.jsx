import { useContext } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { TemaContext } from "../context/TemaContext";
import Hero from "../components/Hero";
import InfoCard from "../components/InfoCard";
import Footer from "../components/Footer";
import "../style/AboutUs.css";

import heroAtardecer from "../assets/heroNosotros.jpg";
import zapas from "../assets/zapas.jpeg";

const AboutUS = () => {
  const { modoOscuro } = useContext(TemaContext);

  return (
    <div
      className={`nosotros-page min-vh-100 ${modoOscuro ? "bg-dark text-white" : "bg-light text-dark"}`}
    >
      <Hero
        titulo="Nuestra Misión"
        subtitulo="Inspirar y acompañar en cada paso"
        imagenFondo={heroAtardecer}
        mostrarBoton={true}
        textoBoton="VER TODOS LOS PRODUCTOS"
        rutaBoton="/catalogo"
      />

      <Container className="py-5 my-4">
        <Row className="align-items-center g-5 mb-5">
          {/* Columna Izquierda: Tarjetas Reutilizables */}
          <Col lg={6} md={12}>
            <Row className="g-4">
              <Col md={12}>
                <InfoCard
                  titulo="Quiénes Somos"
                  descripcion="Somos un equipo apasionado de corredores y tecnólogos dedicados a crear la mejor experiencia para la comunidad de running. Buscamos llevar el calzado deportivo al siguiente nivel combinando confort, diseño y rendimiento."
                />
              </Col>

              <Col md={12}>
                <InfoCard
                  titulo="Pasión por el deporte"
                  descripcion="Nuestra filosofía se basa en el movimiento constante. Cada par de zapatillas que seleccionamos está pensado para dar soporte, amortiguación y velocidad a tus objetivos, ya sea en tus entrenamientos diarios o cruzando la meta de tu próxima maratón."
                />
              </Col>
            </Row>
          </Col>

          {/* Columna Derecha: Imagen de las Zapatillas (Alta Calidad) */}
          <Col lg={6} md={12} className="text-center">
            <div className="shadow-lg rounded-4 overflow-hidden">
              <Image
                src={zapas}
                alt="Zapatillas de Running Premium"
                fluid
                className="nosotros-img w-100 d-block"
              />
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default AboutUS;
