import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { LoginProvider } from "./context/LoginProvider.jsx";
import { TemaProvider } from "./context/TemaProvider.jsx";
import { CarritoProvider } from "./context/CarritoProvider.jsx";
import "./style/Index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoginProvider>
      <TemaProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </TemaProvider>
    </LoginProvider>
  </BrowserRouter>,
);
