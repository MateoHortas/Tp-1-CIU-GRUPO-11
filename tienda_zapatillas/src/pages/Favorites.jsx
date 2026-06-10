import { useContext } from "react";
import { FavoritosContext } from "../context/FavoritosContext";
import ProductCard from "../components/ProductCard";
import { CarritoContext } from "../context/CarritoContext";

function Favoritos() {
  const { favoritos } = useContext(FavoritosContext);
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <div className="container py-4">
      <h2>Mis Favoritos</h2>

      {favoritos.length === 0 ? (
        <p>No tienes productos favoritos.</p>
      ) : (
        <div className="row">
          {favoritos.map((producto) => (
            <div key={producto.id} className="col-md-4 mb-4">
              <ProductCard producto={producto} agregarAlCarrito={agregarAlCarrito}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;