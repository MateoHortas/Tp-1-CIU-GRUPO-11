import ProductCard from "../components/ProductCard";
import { productos } from "../data/data";

function Products() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Catálogo</h1>
        <p className="text-muted">
          Descubrí todas nuestras zapatillas disponibles
        </p>
      </div>

      <div className="row g-4">
        {productos.map((producto) => (
          <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductCard producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;