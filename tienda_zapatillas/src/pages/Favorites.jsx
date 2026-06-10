import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritosContext } from "../context/FavoritosContext";
import { CarritoContext } from "../context/CarritoContext";
import ProductCard from "../components/ProductCard";
import { FiArrowLeft } from "react-icons/fi";
import "../style/Favorites.css";

function Favoritos() {
  const { favoritos } = useContext(FavoritosContext);
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <div className="favorites-page py-5">
      <div className="container">
        <h2 className="favorites-title">❤️ Mis Favoritos</h2>

        <div className="orange-line"></div>

        {favoritos.length === 0 ? (
          <div className="empty-favorites">
            <h3>No tienes favoritos aún</h3>
            <p>
              Explora nuestros productos y agrega tus favoritos haciendo clic en
              el corazón.
            </p>

            <Link to="/productos" className="btn-ver-productos mt-3">
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            <Link to="/productos" className="btn-back mb-4">
              <FiArrowLeft className="icono-flecha" /> Volver a la tienda
            </Link>

            <div className="row favorites-grid">
              {favoritos.map((producto) => (
                <div key={producto.id} className="col-md-4 mb-4">
                  <ProductCard
                    producto={producto}
                    agregarAlCarrito={agregarAlCarrito}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Favoritos;
