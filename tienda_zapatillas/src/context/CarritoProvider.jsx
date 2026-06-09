import { useState } from "react";
import { CarritoContext } from "./CarritoContext";

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const [compraRealizada, setCompraRealizada] = useState(false);

  const cantidadCarrito = carrito.reduce(
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
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item,
        ),
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
            : producto,
        )
        .filter((producto) => producto.cantidad > 0),
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
          : producto,
      ),
    );
  };

  const confirmarCompra = () => {
    setCompraRealizada(true);
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        compraRealizada,
        cantidadCarrito,
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
