import { useContext } from "react";
import { FavoritosContext } from "../context/FavoritosContext";
import ProductCard from "../components/ProductCard";
import { CarritoContext } from "../context/CarritoContext";
import "../style/Favorites.css";

function Favoritos() {
  const { favoritos } = useContext(FavoritosContext);
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
  <div className="favorites-page">
    <div className="container py-5">
      <h2 className="favorites-title">❤️ Mis Favoritos</h2>

      <div className="orange-line"></div>

      {favoritos.length === 0 ? (
        <div className="empty-favorites">
          <h3>No tienes favoritos aún</h3>
          <p>Explora nuestros productos y agrega tus favoritos.</p>
        </div>
      ) : (
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
      )}
    </div>
  </div>
);
}

export default Favoritos;