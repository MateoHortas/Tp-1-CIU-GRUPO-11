import { useState } from "react";
import { TemaContext } from "./TemaContext";

export function TemaProvider({ children }) {
  const [modoOscuro, setModoOscuro] = useState(false);

  const cambiarTema = () => {
    setModoOscuro(!modoOscuro);
  };

  return (
    <TemaContext.Provider value={{ modoOscuro, cambiarTema }}>
      <div className={modoOscuro ? "modo-oscuro-activo" : ""}>{children}</div>
    </TemaContext.Provider>
  );
}
