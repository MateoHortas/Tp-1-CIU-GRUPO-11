import { Link } from "react-router-dom";
import heroImage from "../assets/heroImage.jpeg";
import "../style/Hero.css";

function Hero({
  titulo = (
    <>
      DOMINA TU
      <br />
      CAMINO
    </>
  ),
  subtitulo = "",
  imagenFondo = heroImage, 
  mostrarBoton = true,
  textoBoton = "VER TODOS LOS PRODUCTOS",
  rutaBoton = "/productos",
}) {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${imagenFondo})` }} 
    >
      <div className="hero-overlay">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{titulo}</h1>

            {subtitulo && (
              <p className="hero-subtitle text-white-50">{subtitulo}</p>
            )}

            {mostrarBoton && (
              <Link
                to={rutaBoton}
                className="btn btn-orange btn-lg mt-3 hero-btn shadow-sm fs-6"
              >
                {textoBoton}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
