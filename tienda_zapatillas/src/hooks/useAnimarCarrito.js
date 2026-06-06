import { useState, useEffect } from "react";

export function useAnimarCarrito(cantidadCarrito) {
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    if (cantidadCarrito === 0) return;

    let endTimeoutId = null;
    const startTimeoutId = setTimeout(() => {
      setAnimar(true);
      endTimeoutId = setTimeout(() => setAnimar(false), 300);
    }, 0);

    return () => {
      clearTimeout(startTimeoutId);
      if (endTimeoutId) clearTimeout(endTimeoutId);
    };
  }, [cantidadCarrito]);

  return animar;
}
