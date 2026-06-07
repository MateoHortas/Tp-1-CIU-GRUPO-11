import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail"; // ← AGREGAMOS ESTE IMPORT
import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Cart from "./pages/Cart";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [compraRealizada, setCompraRealizada] = useState(false);


  const agregarAlCarrito = (producto) => {

    setCompraRealizada(false);
     
    const existe = carrito.find(
      item => item.id === producto.id
    );

    if (existe) {

      setCarrito(
        carrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );

    } else {

      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad: 1
        }
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
              cantidad: producto.cantidad - 1
            }
          : producto
      )
      .filter((producto) => producto.cantidad > 0)
  );
}

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
}

  const confirmarCompra = () => {
  setCompraRealizada(true);
  setCarrito([]);
};

  return (
    <Routes>
      {/* Tu ruta actual de la página de inicio */}
      <Route path="/" element={<Home agregarAlCarrito={agregarAlCarrito} carrito={carrito}  />} />
      
      {/* ← AGREGAMOS ESTA NUEVA RUTA DINÁMICA */}
      <Route path="/producto/:id" element={<ProductDetail />} />

      <Route path="/carrito" element=
      {<Cart 
      carrito={carrito} 
      eliminarDelCarrito={eliminarDelCarrito} 
      aumentarCantidad={aumentarCantidad}  
      confirmarCompra={confirmarCompra}
      compraRealizada={compraRealizada}/>} />
    </Routes>
  );
}


export default App;
