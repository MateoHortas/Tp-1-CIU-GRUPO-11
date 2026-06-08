import { Route, Routes } from "react-router-dom";
import { LoginProvider } from "./context/LoginProvider";
import { TemaProvider } from "./context/TemaProvider";
import { CarritoProvider } from "./context/CarritoProvider";

import Navigation from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/RegisterForm";
import AboutUS from "./pages/AboutUs";

function App() {
  return (
    <LoginProvider>
      <TemaProvider>
        <CarritoProvider>
          <Navigation />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/nosotros" element={<AboutUS />} />
          </Routes>
        </CarritoProvider>
      </TemaProvider>
    </LoginProvider>
  );
}

export default App;
