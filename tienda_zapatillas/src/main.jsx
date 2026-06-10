import { BrowserRouter } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { LoginProvider } from "./context/LoginProvider.jsx";
import { TemaProvider } from "./context/TemaProvider.jsx";
import { CarritoProvider } from "./context/CarritoProvider.jsx";
import { FavoritosProvider } from "./context/FavoritosProvider.jsx";
import "./style/Index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoginProvider>
      <TemaProvider>
        <CarritoProvider>
          <FavoritosProvider>
            <App />
          </FavoritosProvider>
        </CarritoProvider>
      </TemaProvider>
    </LoginProvider>
  </BrowserRouter>,
);
