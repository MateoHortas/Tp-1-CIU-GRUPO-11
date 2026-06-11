import { useEffect, useState } from "react";
import { CarritoContext } from "./CarritoContext";

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
  const carritoGuardado = localStorage.getItem("carrito");

    return carritoGuardado
      ? JSON.parse(carritoGuardado)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "carrito",
      JSON.stringify(carrito)
    );
  }, [carrito]);
  const [compraRealizada, setCompraRealizada] = useState(false);

  
  const unidadesTotales = carrito.reduce(
    (acum, producto) => acum + producto.cantidad,
    0,
  );

  const agregarAlCarrito = (producto) => {
    setCompraRealizada(false);
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        ),
      );
    } else {
      setCarrito([
        ...carrito,
        { ...producto, cantidad: 1 },
      ]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(
      carrito
        .map((producto) =>
          producto.id === id
            ? { ...producto, cantidad: producto.cantidad - 1 }
            : producto,
        )
        .filter((producto) => producto.cantidad > 0),
    );
  };

  const aumentarCantidad = (id) => {
    setCarrito(
      carrito.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto,
      ),
    );
  };

  const confirmarCompra = () => {
    setCompraRealizada(true);
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        compraRealizada,
        unidadesTotales, 
        cantidadCarrito: unidadesTotales, 
        agregarAlCarrito,
        eliminarDelCarrito,
        aumentarCantidad,
        confirmarCompra,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}