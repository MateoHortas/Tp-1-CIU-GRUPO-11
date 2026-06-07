import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

import { productos } from "../data/data.js";

function Home({ agregarAlCarrito, carrito }) {
  const cantidadTotal = carrito.reduce((acum, item) => acum + item.cantidad, 0);

  return (
    <>
      <Link
        to="/carrito"
        className="btn"
        style={{
          background: "#ff6600",
          color: "white",
          borderRadius: "25px",
          padding: "10px 20px",
          fontWeight: "600",
          border: "none",
        }}
      >
        🛒 Carrito
        {cantidadTotal > 0 && ` (${cantidadTotal})`}
      </Link>
      <div
        className="text-center py-2"
        style={{
          background: "#ff6600",
          color: "white",
          fontWeight: "600",
        }}
      >
        🚚 Envío gratis en compras superiores a $150.000
      </div>
      <Hero />

      {/* Categorías */}

      <section className="py-5">
        <div className="container">
          <h2 className="section-title">CATEGORIAS MAS ELEGIDAS</h2>
          <div className="orange-line mb-5"></div>

          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <CategoryCard
                title="RUNNING"
                image="https://cdn.runrepeat.com/storage/gallery/buying_guide_primary/269/269-best-daily-running-shoes-15820218-1440.jpg"
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <CategoryCard
                title="TRAINING"
                image="https://images.unsplash.com/photo-1461896836934-ffe607ba8211"
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <CategoryCard
                title="LIFESTYLE"
                image="https://images.unsplash.com/photo-1552346154-21d32810aba3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- NUESTRO CATÁLOGO DE PRODUCTOS --- */}
      <section className="py-5" style={{ background: "#121212" }}>
        <div className="container">
          <h2 className="section-title text-center text-white mb-4">
            NUESTRO CATÁLOGO
          </h2>
          <div className="orange-line mb-5"></div>

          <div className="row g-4">
            {productos.map((prod) => (
              <div key={prod.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                <ProductCard
                  producto={prod}
                  agregarAlCarrito={agregarAlCarrito}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
