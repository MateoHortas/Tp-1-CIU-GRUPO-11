import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { CarritoContext } from "../context/CarritoContext";
import { TemaContext } from "../context/TemaContext";
import { productos } from "../data/data";

function Products() {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { modoOscuro } = useContext(TemaContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const categoriaSeleccionada = searchParams.get("categoria") || "Todas";
  const [talleSeleccionado, setTalleSeleccionado] = useState("Todos");
  const [precioMaximo, setPrecioMaximo] = useState(300000);

  // Estado para detectar si es pantalla de PC (ancho mayor a 991px de Bootstrap)
  const [esPantallaGrande, setEsPantallaGrande] = useState(window.innerWidth > 991);

  useEffect(() => {
    const controlarResizing = () => {
      setEsPantallaGrande(window.innerWidth > 991);
    };
    window.addEventListener("resize", controlarResizing);
    return () => window.removeEventListener("resize", controlarResizing);
  }, []);

  const zapatillasFiltradas = productos.filter((p) => {
    const categoria =
      categoriaSeleccionada === "Todas" ||
      p.categoria === categoriaSeleccionada;
    const talle =
      talleSeleccionado === "Todos" || p.talles.includes(talleSeleccionado);
    const precio = p.precio <= precioMaximo;

    return categoria && talle && precio;
  });

  // Objeto de estilos dinámico para el panel de filtros
  const estilosFiltros = {
    position: "sticky",
    top: "100px",
    // Si es PC, limita la altura al alto de pantalla menos la Navbar y activa la ruedita (scroll)
    maxHeight: esPantallaGrande ? "calc(100vh - 140px)" : "none",
    overflowY: esPantallaGrande ? "auto" : "visible",
    paddingRight: esPantallaGrande ? "10px" : "0px"
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: modoOscuro ? "#1a1a1a" : "#ffffff",
        color: modoOscuro ? "#ffffff" : "#000000",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Catálogo</h1>
          
          <p className={modoOscuro ? "text-light" : "text-muted"}>
            Descubrí todas nuestras zapatillas disponibles
          </p>
        </div>

        <div className="row">
          {/* PANEL DE FILTROS */}
          <div className="col-lg-3 mb-4">
            <div
              className={`${modoOscuro ? "bg-dark text-white" : "bg-white"} p-4 rounded shadow-sm`}
              style={estilosFiltros}
            >
              <h4 className="mb-4">Filtros</h4>

              <h6>Categoría</h6>
              <div className="d-flex flex-column gap-2 mb-4">
                <button
                  className={`btn ${modoOscuro ? "btn-outline-light" : "btn-outline-dark"}`}
                  onClick={() => setSearchParams({ categoria: "Todas" })}
                >
                  Todas
                </button>
                <button
                  className={`btn ${modoOscuro ? "btn-outline-light" : "btn-outline-dark"}`}
                  onClick={() => setSearchParams({ categoria: "Running" })}
                >
                  Running
                </button>
                <button
                  className={`btn ${modoOscuro ? "btn-outline-light" : "btn-outline-dark"}`}
                  onClick={() => setSearchParams({ categoria: "Training" })}
                >
                  Training
                </button>
                <button
                  className={`btn ${modoOscuro ? "btn-outline-light" : "btn-outline-dark"}`}
                  onClick={() => setSearchParams({ categoria: "Lifestyle" })}
                >
                  Lifestyle
                </button>
              </div>

              <h6>Talle</h6>
              <div className="d-flex flex-wrap gap-2">
                <button
                  className={`btn btn-sm ${modoOscuro ? "btn-outline-light" : "btn-outline-dark"}`}
                  onClick={() => setTalleSeleccionado("Todos")}
                >
                  Todos
                </button>

                {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map((talle) => (
                  <button
                    key={talle}
                    className={`btn btn-sm ${modoOscuro ? "btn-outline-light" : "btn-outline-dark"}`}
                    onClick={() => setTalleSeleccionado(talle)}
                  >
                    {talle}
                  </button>
                ))}
              </div>

              <h6 className="mt-4">Precio máximo</h6>
              <p className="fw-bold">${precioMaximo.toLocaleString()}</p>

              <input
                type="range"
                className="form-range"
                min="50000"
                max="300000"
                step="10000"
                value={precioMaximo}
                onChange={(e) => setPrecioMaximo(Number(e.target.value))}
              />
              <button
                className="btn btn-warning w-100 mt-4"
                onClick={() => {
                  setSearchParams({ categoria: "Todas" });
                  setTalleSeleccionado("Todos");
                  setPrecioMaximo(300000);
                }}
              >
                Limpiar filtros
              </button>
            </div>
          </div>

          {/* PRODUCTOS */}
          <div className="col-lg-9">
            <div className="row g-4">
              {zapatillasFiltradas.map((producto) => (
                <div key={producto.id} className="col-12 col-sm-6 col-xl-4">
                  <ProductCard
                    producto={producto}
                    agregarAlCarrito={agregarAlCarrito}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;