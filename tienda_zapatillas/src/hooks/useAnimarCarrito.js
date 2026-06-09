import { useState, useEffect } from "react";

export function useAnimarCarrito(unidadesTotales) {
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    if (unidadesTotales === 0) return;

    let endTimeoutId = null;
    const startTimeoutId = setTimeout(() => {
      setAnimar(true);
      endTimeoutId = setTimeout(() => setAnimar(false), 300);
    }, 0);

    return () => {
      clearTimeout(startTimeoutId);
      if (endTimeoutId) clearTimeout(endTimeoutId);
    };
  }, [unidadesTotales]);

  return animar;
}
