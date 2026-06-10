import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import { TemaContext } from "./context/TemaContext";
import { CarritoContext } from "./context/CarritoContext";
import { LoginProvider } from "./context/LoginProvider";
import { FavoritosProvider } from "./context/FavoritosProvider";


import Navigation from "./components/Navbar";

import Products from "./pages/Products";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUS from "./pages/AboutUs";
import UserContact from "./pages/UserContact";
import ScrollToTop from "./components/ScrollToTop";
import Favoritos from "./pages/Favorites";

function App() {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [compraRealizada, setCompraRealizada] = useState(false);

  const cambiarTema = () => {
    setModoOscuro(!modoOscuro);
  };

  const agregarAlCarrito = (producto) => {
    setCompraRealizada(false);

    const existe = carrito.find(
      (item) => item.id === producto.id
    );

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        )
      );
    } else {
      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad: 1,
        },
      ]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(
      carrito
        .map((producto) =>
          producto.id === id
            ? {
                ...producto,
                cantidad: producto.cantidad - 1,
              }
            : producto
        )
        .filter((producto) => producto.cantidad > 0)
    );
  };

  const aumentarCantidad = (id) => {
    setCarrito(
      carrito.map((producto) =>
        producto.id === id
          ? {
              ...producto,
              cantidad: producto.cantidad + 1,
            }
          : producto
      )
    );
  };

  const confirmarCompra = () => {
    setCompraRealizada(true);
    setCarrito([]);
  };

  const cantidadCarrito = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  return (
    <LoginProvider>
      <FavoritosProvider>
        <TemaContext.Provider
          value={{ modoOscuro, cambiarTema }}
        >
          <CarritoContext.Provider
            value={{
              carrito,
              cantidadCarrito,
              agregarAlCarrito,
            }}
          >
            <div
              className={
                modoOscuro
                  ? "modo-oscuro-activo"
                  : ""
              }
            >
              <Navigation />
              <ScrollToTop />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      agregarAlCarrito={agregarAlCarrito}
                      carrito={carrito}
                    />
                  }
                />

                <Route
                  path="/producto/:id"
                  element={<ProductDetail />}
                />

                <Route
                  path="/carrito"
                  element={
                    <Cart
                      carrito={carrito}
                      eliminarDelCarrito={
                        eliminarDelCarrito
                      }
                      aumentarCantidad={
                        aumentarCantidad
                      }
                      confirmarCompra={
                        confirmarCompra
                      }
                      compraRealizada={
                        compraRealizada
                      }
                    />
                  }
                />

                <Route
                  path="/login"
                  element={<Login />}
                />

                <Route
                  path="/register"
                  element={<Register />}
                />

                <Route
                  path="/nosotros"
                  element={<AboutUS />}
                />

                <Route
                  path="/contacto"
                  element={<UserContact />}
                />

                <Route
                  path="/productos"
                  element={<Products />}
                />
                <Route path="/favoritos" element={<Favoritos />} />
              </Routes>
            </div>
          </CarritoContext.Provider>
        </TemaContext.Provider>
      </FavoritosProvider>
    </LoginProvider>
  );
}

export default App;