import { useState } from "react";
import { CarritoContext } from "./CarritoContext";

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

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
    <CarritoContext.Provider
      value={{ carrito, cantidadCarrito, agregarAlCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
