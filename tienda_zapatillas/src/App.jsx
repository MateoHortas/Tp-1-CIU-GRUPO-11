import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { TemaContext } from "./context/TemaContext";
import { CarritoContext } from "./context/CarritoContext";
import { LoginProvider } from "./context/LoginContext";
import Navigation from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUS from "./pages/AboutUs";

function App() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [carrito, setCarrito] = useState([]);

  const cambiarTema = () => {
    setModoOscuro(!modoOscuro);
  };

  const agregarAlCarrito = (productoNuevo) => {
    setCarrito((carritoActual) => {
      const existe = carritoActual.find(
        (producto) => producto.id === productoNuevo.id,
      );

      if (existe) {
        return carritoActual.map((producto) =>
          producto.id === productoNuevo.id
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
    <LoginProvider>
      <TemaContext.Provider value={{ modoOscuro, cambiarTema }}>
        <CarritoContext.Provider
          value={{ carrito, cantidadCarrito, agregarAlCarrito }}
        >
          <div className={modoOscuro ? "modo-oscuro-activo" : ""}>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/nosotros" element={<AboutUS />} />
            </Routes>
          </div>
        </CarritoContext.Provider>
      </TemaContext.Provider>
    </LoginProvider>
  );
}

export default App;
