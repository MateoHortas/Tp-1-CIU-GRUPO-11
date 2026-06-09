import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { TemaContext } from "./context/TemaContext";

import Navigation from "./components/Navbar";

import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUS from "./pages/AboutUs";
import UserContact from "./pages/UserContact";

function App() {
  const { modoOscuro } = useContext(TemaContext);

  return (
    <div className={modoOscuro ? "modo-oscuro-activo" : ""}>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/nosotros" element={<AboutUS />} />
        <Route path="/contacto" element={<UserContact />} />
      </Routes>
    </div>
  );
}

export default App;
