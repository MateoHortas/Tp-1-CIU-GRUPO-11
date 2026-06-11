import { useEffect, useState } from "react";
import { FavoritosContext } from "./FavoritosContext";

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const favoritosGuardados = localStorage.getItem("favoritos");

    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  })

  const agregarAFavoritos = (producto) => {
    const existe = favoritos.some((item) => item.id === producto.id);

    if (!existe) {
      setFavoritos([...favoritos, producto]);
    }
  };

  const eliminarFavorito = (id) => {
    setFavoritos(favoritos.filter((item) => item.id !== id));
  };

  const esFavorito = (id) => {
    return favoritos.some((item) => item.id === id);
  };

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        agregarAFavoritos,
        eliminarFavorito,
        esFavorito,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}
