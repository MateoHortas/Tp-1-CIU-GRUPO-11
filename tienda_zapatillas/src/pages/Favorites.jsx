import { useContext } from "react";
import { FavoritosContext } from "../context/FavoritosContext";
import ProductCard from "../components/ProductCard";
import { CarritoContext } from "../context/CarritoContext";
import { TemaContext } from "../context/TemaContext"; // 1. Importamos el TemaContext
import "../style/Favorites.css";

function Favoritos() {
  const { favoritos } = useContext(FavoritosContext);
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { modoOscuro } = useContext(TemaContext); // 2. Consumimos el estado global

  return (
    <div
      className="favorites-page"
      style={{
        backgroundColor: modoOscuro ? "#1a1a1a" : "#ffffff",
        color: modoOscuro ? "#ffffff" : "#000000",
        minHeight: "100vh",
      }}
    >
      <div className="container py-5">
        <h2
          className="favorites-title"
          style={{ color: modoOscuro ? "#ffffff" : "inherit" }}
        >
          ❤️ Mis Favoritos
        </h2>

        <div className="orange-line"></div>

        {favoritos.length === 0 ? (
          <div className="empty-favorites text-center mt-5">
            <h3>No tienes favoritos aún</h3>
            <p className={modoOscuro ? "text-light" : "text-muted"}>
              Explora nuestros productos y agrega tus favoritos.
            </p>
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
