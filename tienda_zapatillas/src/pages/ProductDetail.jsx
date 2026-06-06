import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productos } from '../data/data';

function ProductDetail() {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === parseInt(id));
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
  const [stock, setStock] = useState(producto?.stock || 0);

  if (!producto) {
    return (
      <div style={{ color: "#fff", textAlign: "center", padding: "50px", fontFamily: "sans-serif" }}>
        <h2>Producto no encontrado</h2>
        <Link to="/" style={{ color: "#ff6600", textDecoration: "none", fontWeight: "bold" }}>
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const { nombre, precio, imagen, descripcion, talles } = producto;
  const rutaLimpia = imagen.startsWith('/') ? imagen : `/${imagen}`;
  const srcImagenAbsoluta = `${window.location.origin}${rutaLimpia}`;

  return (
    <div style={{ 
      background: "#121212", 
      minHeight: "100vh", 
      color: "#fff", 
      padding: "30px 20px",
      fontFamily: "sans-serif"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        <div style={{ marginBottom: "15px" }}>
          <Link 
            to="/" 
            style={{ 
              color: "#a0a0a0", 
              textDecoration: "none", 
              fontSize: "15px", 
              fontWeight: "500",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 12px",
              borderRadius: "6px",
              background: "#1e1e1e",
              border: "1px solid #333",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#ff6600";
              e.currentTarget.style.borderColor = "#ff6600";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#a0a0a0";
              e.currentTarget.style.borderColor = "#333";
            }}
          >
            <span>←</span> Volver al catálogo
          </Link>
        </div>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "40px",
          alignItems: "start",
          marginTop: "10px"
        }}>
          
          <div style={{ 
            background: "#ffffff", 
            borderRadius: "20px", 
            padding: "40px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            height: "450px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
          }}>
            <img 
              src={srcImagenAbsoluta} 
              alt={nombre} 
              style={{ 
                maxWidth: "100%", 
                maxHeight: "100%", 
                objectFit: "contain"
              }} 
            />
          </div>

          <div style={{ 
            display: "flex", 
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: "10px"
          }}>
            
            <h1 style={{ 
              fontSize: "36px", 
              fontWeight: "700", 
              margin: "0 0 15px 0",
              color: "#fff"
            }}>
              {nombre}
            </h1>

            <div style={{ 
              fontSize: "32px", 
              fontWeight: "700", 
              color: "#fff", 
              marginBottom: "30px" 
            }}>
              ${precio.toLocaleString('es-AR')}
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h4 style={{ color: "#fff", margin: "0 0 10px 0", fontSize: "18px", fontWeight: "600" }}>
                Descripción completa
              </h4>
              <p style={{ 
                color: "#a0a0a0", 
                lineHeight: "1.6", 
                margin: 0,
                fontSize: "15px"
              }}>
                {descripcion}
              </p>
            </div>

            <div style={{ marginBottom: "30px" }}>
              <h4 style={{ color: "#fff", margin: "0 0 15px 0", fontSize: "17px", fontWeight: "600" }}>
                Seleccionar Talle (AR)
              </h4>
              
              {talles && talles.length > 0 && stock > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                  {talles.map((talle) => (
                    <button
                      key={talle}
                      onClick={() => setTalleSeleccionado(talle)}
                      style={{
                        background: talleSeleccionado === talle ? "#ff6600" : "transparent",
                        color: "#fff",
                        border: talleSeleccionado === talle ? "2px solid #ff6600" : "1px solid #333",
                        padding: "12px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "15px",
                        transition: "all 0.15s ease",
                        minWidth: "55px"
                      }}
                    >
                      {talle}
                    </button>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#ff4444", fontSize: "14px", margin: 0 }}>
                  No hay talles disponibles.
                </p>
              )}
            </div>

            <div style={{ 
              fontSize: "15px", 
              fontWeight: "500", 
              color: stock > 0 ? "#28a745" : "#d9534f",
              marginBottom: "20px"
            }}>
              {stock > 0 ? `Stock disponible: ${stock} unidades` : "No disponible"}
            </div>

            <button 
              disabled={stock === 0 || (talles && talles.length > 0 && !talleSeleccionado)}
              style={{ 
                background: stock === 0 ? "#2A2A2A" : (talles && talles.length > 0 && !talleSeleccionado ? "#444" : "#ff6600"), 
                color: stock === 0 ? "#777" : "#fff", 
                border: "none", 
                padding: "16px 0", 
                borderRadius: "10px", 
                fontWeight: "700", 
                fontSize: "16px",
                width: "100%",
                maxWidth: "350px",
                cursor: (stock === 0 || (talles && talles.length > 0 && !talleSeleccionado)) ? "not-allowed" : "pointer",
                transition: "background 0.2s ease"
              }}
              onClick={() => setStock(stock - 1)}
            >
              {stock === 0 ? "Sin stock" : "Agregar al carrito"}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;