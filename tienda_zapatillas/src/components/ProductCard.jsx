import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useContext } from "react";
import { FavoritosContext } from "../context/FavoritosContext";
import { LoginContext } from "../context/LoginContext";

import "../style/ProductCard.css";

function ProductCard({ producto, agregarAlCarrito }) {
  const { nombre, categoria, precio, imagen, descripcion, stock } = producto;
  const { usuario } = useContext(LoginContext);

  const {
    agregarAFavoritos,
    eliminarFavorito,
    esFavorito,
  } = useContext(FavoritosContext);

  const toggleFavorito = () => {
    if(!usuario){
      alert("Debes iniciar sesion para agregar favoritos")
      return
    }

    if (esFavorito(producto.id)) {
      eliminarFavorito(producto.id);
    } else {
      agregarAFavoritos(producto);
  }
  }

  // Forzar que empiece con '/' para evitar errores de rutas relativas
  const srcImagen = imagen.startsWith("/") ? imagen : `/${imagen}`;

  return (
    <div
      className="product-card"
      style={{
        background: "#1e1e1e",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "220px",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <button
          onClick={toggleFavorito}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            border: "none",
            background: "rgba(255,255,255,0.9)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            zIndex: 3,
          }}
        >
          {esFavorito(producto.id) ? (
            <FaHeart color="red" />
          ) : (
            <FiHeart />
          )}
        </button>
        <img
          src={srcImagen}
          alt={nombre}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            padding: "15px",
            display: "block",
          }}
        />

        {stock === 0 && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "#d9534f",
              color: "#fff",
              padding: "4px 10px",
              fontSize: "12px",
              fontWeight: "bold",
              borderRadius: "4px",
              zIndex: 2,
            }}
          >
            Sin stock
          </span>
        )}
      </div>

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <span
          style={{
            background: "#ff6600",
            color: "#fff",
            fontSize: "11px",
            fontWeight: "700",
            padding: "5px 10px",
            borderRadius: "20px",
            display: "inline-block",
            width: "fit-content",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {categoria}
        </span>

        <h3
          style={{
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: "600",
            margin: "0 0 5px 0",
            fontFamily: "sans-serif",
          }}
        >
          {nombre}
        </h3>

        <div
          style={{
            color: "#ffc107",
            marginBottom: "10px",
            fontSize: "14px",
          }}
        >
          ⭐⭐⭐⭐⭐
        </div>

        <p
          style={{
            color: "#aaaaaa",
            fontSize: "14px",
            lineHeight: "1.4",
            margin: "0 0 20px 0",
            flexGrow: 1,
            fontFamily: "sans-serif",
          }}
        >
          {descripcion.length > 65
            ? `${descripcion.substring(0, 65)}...`
            : descripcion}
        </p>

        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              color: "#ff6600",
              fontSize: "26px",
              fontWeight: "700",
              marginBottom: "15px",
              fontFamily: "sans-serif",
            }}
          >
            ${precio.toLocaleString("es-AR")}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link
              to={`/producto/${producto.id}`}
              className="btn btn-outline-light btn-sm"
              style={{
                flex: 1,
                fontWeight: "500",
                textDecoration: "none",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Ver detalle
            </Link>

            <button
              className="btn btn-sm"
              disabled={stock === 0}
              onClick={() => agregarAlCarrito(producto)}
              style={{
                flex: 1,
                background: stock === 0 ? "#444" : "#ff6600",
                color: "#fff",
                fontWeight: "500",
                border: "none",
              }}
            >
              {stock === 0 ? "No disponible" : "Agregar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;