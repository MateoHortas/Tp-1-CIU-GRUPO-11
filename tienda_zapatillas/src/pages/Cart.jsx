import { Link } from "react-router-dom";
import "../style/cart.css";
import { useState } from "react";


function Cart({
  carrito,
  eliminarDelCarrito,
  aumentarCantidad,
  confirmarCompra,
  compraRealizada,
}) {


  const unidadesTotales = carrito.reduce(
    (acum, producto) => acum + producto.cantidad,
    0
  );


  const productosDistintos = carrito.length;

  const [codigoPromo, setCodigoPromo] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [mensajePromo, setMensajePromo] = useState("");
  const [promoAplicada, setPromoAplicada] = useState(false);

  const codigosPromocionales = {
    TRIATLON10: 10,
    TRIATLON20: 20,
    BIENVENIDO: 15,
  };

  const total = carrito.reduce(
    (acum, producto) => acum + producto.precio * producto.cantidad,
    0
  );

  const montoDescuento = total * (descuento / 100);

  const totalFinal = total - montoDescuento;
  
  const aplicarCodigo = () => {
      if (promoAplicada) {
        setMensajePromo("Ya se aplicó un código promocional.");
        return;
      }
      const codigo = codigoPromo.trim().toUpperCase();

      if (codigosPromocionales[codigo]) {
        setDescuento(codigosPromocionales[codigo]);
        setMensajePromo(
          `Código aplicado: ${codigosPromocionales[codigo]}% de descuento`
        );
        setPromoAplicada(true)
      } else {
        setDescuento(0);
        setMensajePromo("Código inválido");
      }
  };

  const cancelarCodigo = () => {
    setCodigoPromo("");
    setDescuento(0);
    setMensajePromo("");
    setPromoAplicada(false);
  };

  return (
    <div className="cart-dark py-5">
      <div className="container">

        <Link to="/productos" className="btn btn-back mb-4">
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

            <Link to="/productos" className="btn btn-primary-custom mt-3">
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

                    <h3 className="product-title">
                      {producto.nombre}
                    </h3>

                    <p>Precio unitario: ${producto.precio.toLocaleString("es-AR")}</p>

                    <p>Cantidad: {producto.cantidad}</p>

                    <div className="product-total">
                      ${(producto.precio * producto.cantidad).toLocaleString("es-AR")}
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

              <p>Productos distintos: <strong>{productosDistintos}</strong></p>
              <p>Unidades totales: <strong>{unidadesTotales}</strong></p>

              <p>
                🚚 Envío: <span className="free-shipping">Gratis</span>
              </p>

              <hr />

              <p className="total-label">SUBTOTAL</p>

              <div className="total-price">
                ${total.toLocaleString("es-AR")}
              </div>

              {descuento > 0 && (
                  <p className="mt-3">
                    Descuento ({descuento}%):
                    <strong className="text-success">
                      {" "}
                      -${montoDescuento.toLocaleString("es-AR")}
                    </strong>
                  </p>
                )}

                <p className="total-label mt-3">
                  TOTAL FINAL
                </p>

                <div className="total-price text-success">
                  ${totalFinal.toLocaleString("es-AR")}
                </div>

              {descuento > 0 && (
                <p className="benefit">✔ Beneficio aplicado</p>
              )}
              
              <div className="promo-section">
                <div className="promo-header">
                  <h4>
                    Código promocional

                    {promoAplicada && (
                      <button
                        className="btn-cancel-promo"
                        onClick={cancelarCodigo}
                        title="Cancelar código"
                      >
                        ✕
                      </button>
                    )}
                  </h4>
                </div>

                  <input
                    type="text"
                    value={codigoPromo}
                    onChange={(e) => setCodigoPromo(e.target.value)}
                    placeholder="Ingrese un código"
                    disabled={promoAplicada}
                  />
                <button
                  className="btn-aplicar-promo"
                  onClick={aplicarCodigo}
                  disabled={promoAplicada}
                >
                  Aplicar
                </button>

                <div className="promo-codigos">
                  <p>Códigos de prueba:</p>
                  <ul>
                    <li>TRIATLON10 → 10%</li>
                    <li>TRIATLON20 → 20%</li>
                    <li>BIENVENIDO → 15%</li>
                  </ul>
                </div>

                {mensajePromo && (
                  <p
                    className={
                      mensajePromo.includes("aplicado")
                        ? "promo-exito"
                        : "promo-error"
                    }
                  >
                    {mensajePromo}
                  </p>
                )}
            </div>
              <button
                className="btn btn-confirm"
                onClick={() => {
                  confirmarCompra();
                  setCodigoPromo("");
                  setDescuento(0);
                  setMensajePromo("");
                  setPromoAplicada(false);
                }}
              >
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