import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

import "../style/cart.css";

function Cart() {
  const {
    carrito,
    unidadesTotales,
    eliminarDelCarrito,
    aumentarCantidad,
    confirmarCompra,
    compraRealizada,
  } = useContext(CarritoContext);

  const total = carrito.reduce(
    (acum, producto) => acum + producto.precio * producto.cantidad,
    0,
  );

  const productosDistintos = carrito.length;

  return (
    <div className="cart-dark py-5">
      <div className="container">
        <Link to="/" className="btn btn-back mb-4">
          ← Seguir comprando
        </Link>

        <h2 className="section-title text-center">TU CARRITO</h2>
        <div className="orange-line mb-5"></div>

        {compraRealizada && (
          <div className="success-box">
            ✅ ¡Gracias por tu compra! Tu pedido fue registrado correctamente.
          </div>
        )}

        {carrito.length === 0 ? (
          <div className="empty-cart">
            <h2>🛒 Tu carrito está vacío</h2>
            <p>Todavía no agregaste productos.</p>

            <Link to="/" className="btn btn-primary-custom mt-3">
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            {carrito.map((producto) => (
              <div key={producto.id} className="cart-item mb-4">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center mb-3 mb-md-0">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="img-fluid rounded cart-img"
                    />
                  </div>

                  <div className="col-md-9">
                    <h3 className="product-title">{producto.nombre}</h3>

                    <p>
                      Precio unitario: $
                      {producto.precio.toLocaleString("es-AR")}
                    </p>

                    <p>Cantidad: {producto.cantidad}</p>

                    <div className="product-total">
                      $
                      {(producto.precio * producto.cantidad).toLocaleString(
                        "es-AR",
                      )}
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-orange"
                        onClick={() => eliminarDelCarrito(producto.id)}
                      >
                        -
                      </button>

                      <span className="qty">{producto.cantidad}</span>

                      <button
                        className="btn btn-orange"
                        onClick={() => aumentarCantidad(producto.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <h3>📦 Resumen de compra</h3>

              <p>
                Productos distintos: <strong>{productosDistintos}</strong>
              </p>
              <p>
                Unidades totales: <strong>{unidadesTotales}</strong>
              </p>

              <p>
                🚚 Envío: <span className="free-shipping">Gratis</span>
              </p>

              <hr />

              <p className="total-label">TOTAL</p>

              <div className="total-price">
                ${total.toLocaleString("es-AR")}
              </div>

              <p className="benefit">✔ Beneficio aplicado</p>

              <button className="btn btn-confirm" onClick={confirmarCompra}>
                Confirmar compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
