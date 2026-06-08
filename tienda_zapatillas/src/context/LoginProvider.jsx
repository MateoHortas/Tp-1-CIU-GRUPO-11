import { useState } from "react";
import { LoginContext } from "./LoginContext";

export function LoginProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const login = (datosUsuario) => setUsuario(datosUsuario);
  const logout = () => setUsuario(null);

  return (
    <LoginContext.Provider value={{ usuario, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}
