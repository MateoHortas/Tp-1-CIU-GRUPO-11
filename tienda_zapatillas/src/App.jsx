import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { TemaContext } from "./context/TemaContext";
import { CarritoContext } from "./context/CarritoContext";

import Navigation from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const [modoOscuro, setModoOscuro] = useState(false);

  const [carrito, setCarrito] = useState([]);

  const cambiarTema = () => {
    setModoOscuro(!modoOscuro);
  };

  const agregarAlCarrito = (productoNuevo) => {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find(
        (producto) =>
          producto.id === productoNuevo.id &&
          producto.talleElegido === productoNuevo.talleElegido,
      );

      if (existe) {
        return carritoActual.map((producto) =>
          producto.id === productoNuevo.id &&
          producto.talleElegido === productoNuevo.talleElegido
            ? { ...producto, cantidad: producto.cantidad + 1 }
            : producto,
        );
      } else {
        return [...carritoActual, { ...productoNuevo, cantidad: 1 }];
      }
    });
  };

  const cantidadCarrito = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0,
  );

  return (
    <TemaContext.Provider value={{ modoOscuro, cambiarTema }}>
      <CarritoContext.Provider
        value={{ carrito, cantidadCarrito, agregarAlCarrito }}
      >
        <div className={modoOscuro ? "modo-oscuro-activo" : ""}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </CarritoContext.Provider>
    </TemaContext.Provider>
  );
}

export default App;
