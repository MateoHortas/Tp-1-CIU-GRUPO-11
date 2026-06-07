import { Link } from "react-router-dom";

function Cart({
  carrito,
  eliminarDelCarrito,
  aumentarCantidad,
  confirmarCompra,
  compraRealizada,
}) {
  const total = carrito.reduce(
    (acum, producto) => acum + producto.precio * producto.cantidad,
    0,
  );

  const unidadesTotales = carrito.reduce(
    (acum, producto) => acum + producto.cantidad,
    0,
  );

  const productosDistintos = carrito.length;

  return (
    <div
      className="py-5"
      style={{
        background: "#121212",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {" "}
      <div className="container">
        <Link
          to="/"
          className="btn mb-4"
          style={{
            border: "1px solid #ff6600",
            color: "#ff6600",
          }}
        >
          ← Seguir comprando{" "}
        </Link>

        <h2 className="section-title text-center">TU CARRITO</h2>

        <div className="orange-line mb-4"></div>

        {compraRealizada && (
          <div
            className="alert text-center mb-4"
            style={{
              background: "#ff6600",
              color: "white",
              border: "none",
              fontWeight: "600",
            }}
          >
            ✅ ¡Gracias por tu compra! Tu pedido fue registrado correctamente.
          </div>
        )}

        {carrito.length === 0 ? (
          <div
            className="text-center p-5"
            style={{
              background: "#1e1e1e",
              borderRadius: "10px",
            }}
          >
            <h4>🛒 Tu carrito está vacío</h4>
          </div>
        ) : (
          <>
            {carrito.map((producto) => (
              <div
                key={producto.id}
                className="card mb-3"
                style={{
                  background: "#1e1e1e",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                }}
              >
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-3 text-center mb-3 mb-md-0">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="img-fluid rounded"
                        style={{
                          maxHeight: "140px",
                          objectFit: "contain",
                        }}
                      />
                    </div>

                    <div className="col-md-9">
                      <h4
                        className="card-title"
                        style={{
                          color: "#ff6600",
                          fontWeight: "700",
                        }}
                      >
                        {producto.nombre}
                      </h4>

                      <p className="mb-1">
                        <strong>Precio unitario:</strong> $
                        {producto.precio.toLocaleString("es-AR")}
                      </p>

                      <p className="mb-1">
                        <strong>Cantidad:</strong> {producto.cantidad}
                      </p>

                      <p className="mb-3">
                        <strong>Subtotal:</strong> $
                        {(producto.precio * producto.cantidad).toLocaleString(
                          "es-AR",
                        )}
                      </p>

                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn"
                          style={{
                            border: "1px solid #ff6600",
                            color: "#ff6600",
                            background: "transparent",
                          }}
                          onClick={() => eliminarDelCarrito(producto.id)}
                        >
                          -
                        </button>

                        <span className="fw-bold fs-5">
                          {producto.cantidad}
                        </span>

                        <button
                          className="btn"
                          style={{
                            background: "#ff6600",
                            color: "white",
                            border: "none",
                          }}
                          onClick={() => aumentarCantidad(producto.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="card mt-4"
              style={{
                background: "#1e1e1e",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
              }}
            >
              <div className="card-body">
                <h4 className="mb-3">📋 Resumen de compra</h4>

                <p>
                  <strong>📦 Productos distintos:</strong> {productosDistintos}
                </p>

                <p>
                  <strong>👟 Unidades totales:</strong> {unidadesTotales}
                  <p>
                    <strong>🚚 Envío:</strong> Gratis
                  </p>
                </p>

                <hr />

                <h3
                  className="mb-4"
                  style={{
                    color: "#ff6600",
                    fontWeight: "700",
                  }}
                >
                  💰 Total: ${total.toLocaleString("es-AR")}
                  <p style={{ color: "#28a745" }}>✔ Beneficio aplicado</p>
                </h3>

                <button
                  className="btn w-100"
                  style={{
                    background: "#ff6600",
                    color: "white",
                    border: "none",
                    fontWeight: "600",
                  }}
                  onClick={confirmarCompra}
                >
                  Confirmar compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
