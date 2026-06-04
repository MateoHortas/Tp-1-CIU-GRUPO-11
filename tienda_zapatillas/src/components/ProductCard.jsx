import { Link } from "react-router";
import "../style/ProductCard.css";


function ProductCard({ product }) {
  return (
    <div className="card product-card h-100 border-0 shadow-sm">
      <div className="card-body d-flex flex-column">
        <img
          src={product.variantes[0].imagen[0]}
          className="card-img-top"
          alt={product.nombre}
        />

          <h5 className="mt-2 product-title text-center">
            {product.nombre}
          </h5>

          <h4 className="text-orange mt-3">
            $
            {product.precio.toLocaleString("es-AR")}
          </h4>

          <Link
            to={`/producto/${product.id}`}
            className="btn btn-orange w-100 mt-auto"
          >
            Ver Producto
          </Link>

        </div>
      </div>
  );
}

export default ProductCard;