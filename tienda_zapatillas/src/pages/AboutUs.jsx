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
        rutaBoton="/productos"
      />

      <Container className="py-5 my-4">
        <Row className="align-items-center g-5 mb-5">
          <Col lg={6} md={12}>
            <Row className="g-4">
              <Col md={12}>
                <InfoCard
                  titulo="Quiénes Somos"
                  descripcion={`Somos un equipo que dejó todo atrás y decidió emprender en el mundo del calzado para deportistas y amantes del camino. Nuestro objetivo es ofrecer la mejor experiencia para nuestros clientes en la búsqueda de ese par de zapatillas que los van a ayudar a escribir su siguiente historia.Somos el nexo entre el mejor calzado, tus sueños y tus ganas de vivir la vida.`}
                />
              </Col>

              <Col md={12}>
                <InfoCard
                  titulo="¿Qué nos motiva?"
                  descripcion={`Cientos de miles de personas avanzan día a día, cada una en su propio camino y desafiando las dificultades de la vida. Nosotros queremos acompañarte en ese trayecto, ofreciéndote las mejores marcas y productos de primera calidad para que nunca te detengas en la búsqueda de lo que tanto anhelas.Porque tu camino también es el nuestro.`}
                />
              </Col>
            </Row>
          </Col>

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
