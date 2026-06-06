import { Link } from "react-router-dom";
import "../style/Hero.css";

function Hero() {
  return (
    <section
      className="hero"
    >
      <div className="hero-overlay">

        <div className="container">

          <div className="hero-content">
            <h1 className="hero-title">
              DOMINA TU
              <br />
              CAMINO
            </h1>

            <button className="btn btn-orange btn-lg mt-3">
              <Link className="btn btn-orange" to="/catalogo">
                VER TODOS LOS PRODUCTOS
              </Link>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;