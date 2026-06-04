import Footer from "../components/Footer";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

import {productos} from "../data/data.js";

function Home() {
  return (
    <>
      <Hero />

      {/* Categorías */}

      <section className="py-5">

        <div className="container">
            <h2 className="section-title">
                CATEGORIAS MAS ELEGIDAS
            </h2>
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
                image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
              />

            </div>

          </div>

        </div>

      </section>

      {/* Productos */}

      <section className="featured-section">

        <div className="container">

          <h2 className="section-title">
            PRODUCTOS DESTACADOS
          </h2>

          <div className="orange-line mb-5"></div>

          <div className="row g-4">

            {productos.slice(1, 5).map((productos) => (
              <div
                className="col-12 col-sm-6 col-lg-3"
                key={productos.id}
              >
                <ProductCard product={productos} />
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