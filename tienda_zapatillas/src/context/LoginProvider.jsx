import { useEffect, useState } from "react";
import { LoginContext } from "./LoginContext";

export function LoginProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem("usuario");

    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const login = (datosUsuario) => setUsuario(datosUsuario);
  const logout = () => setUsuario(null);

  useEffect(() => {
    if(usuario){
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario")
    }
  }, [usuario])

  return (
    <LoginContext.Provider value={{ usuario, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}
