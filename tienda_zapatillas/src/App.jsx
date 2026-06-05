import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail"; // ← AGREGAMOS ESTE IMPORT
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      {/* Tu ruta actual de la página de inicio */}
      <Route path="/" element={<Home />} />
      
      {/* ← AGREGAMOS ESTA NUEVA RUTA DINÁMICA */}
      <Route path="/producto/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;