import "../style/Footer.css";

function Footer() {
  return (
    <>
      <section className="services-section">

        <div className="container">

          <div className="row text-center">

            <div className="col-md-4">
              <i className="bi bi-truck fs-2"></i>

              <h6 className="mt-2">
                <b>ENVÍOS SEGUROS</b>
              </h6>

              <p>
                A todo el país con seguimiento.
              </p>
            </div>

            <div className="col-md-4">
              <i className="bi bi-arrow-repeat fs-2"></i>

              <h6 className="mt-2">
                <b>CAMBIOS GRATIS</b>
              </h6>

              <p>
                Tenés 30 días para cambios.
              </p>
            </div>

            <div className="col-md-4">
              <i className="bi bi-shield-check fs-2"></i>

              <h6 className="mt-2">
                <b>CALIDAD GARANTIZADA</b>
              </h6>

              <p>
                Materiales premium.
              </p>
            </div>

          </div>

        </div>

      </section>

      <footer className="footer-custom">

        <div className="container d-flex justify-content-between">

          <span>
            © 2026 TRIATLON CALZADOS.
          </span>

          <span>
            TODOS LOS DERECHOS RESERVADOS.
          </span>

        </div>

      </footer>
    </>
  );
}

export default Footer;