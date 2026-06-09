import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { CarritoContext } from "../context/CarritoContext";
import { productos } from "../data/data";

function Products() {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [searchParams, setSearchParams] = useSearchParams()
  const categoriaSeleccionada = searchParams.get("categoria") || "Todas"
  const [talleSeleccionado, setTalleSeleccionado] =
  useState("Todos");

  const [precioMaximo, setPrecioMaximo] = useState(300000);

  const zapatillasFiltradas = productos.filter(p => {
    const categoria = categoriaSeleccionada === "Todas" || p.categoria === categoriaSeleccionada;
    const talle = talleSeleccionado === "Todos" || p.talles.includes(talleSeleccionado)
    const precio = p.precio <= precioMaximo

    return categoria && talle && precio
  })


  return (
    
      <div
        className="container-fluid py-5"
        style={{
          backgroundColor: "#F4ECE7",
          minHeight: "100vh",
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold">Catálogo</h1>
            <p className="text-muted">
              Descubrí todas nuestras zapatillas disponibles
            </p>
          </div>

          <div className="row">
            {/* PANEL DE FILTROS */}
            <div className="col-lg-3 mb-4">
              <div
                className="bg-white p-4 rounded shadow-sm"
                style={{ position: "sticky", top: "100px" }}
              >
                <h4 className="mb-4 ">Filtros</h4>

                <h6>Categoría</h6>

                <div className="d-flex flex-column gap-2 mb-4">
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => setSearchParams({ categoria: "Todas" })}
                  >
                    Todas
                  </button>

                  <button
                    className="btn btn-outline-dark"
                    onClick={() => setSearchParams({ categoria: "Running" })}
                  >
                    Running
                  </button>

                  <button
                    className="btn btn-outline-dark"
                    onClick={() => setSearchParams({ categoria: "Training" })}
                  >
                    Training
                  </button>

                  <button
                    className="btn btn-outline-dark"
                    onClick={() => setSearchParams({ categoria: "Lifestyle" })}
                  >
                    Lifestyle
                  </button>
                </div>

                <h6>Talle</h6>

                <div className="d-flex flex-wrap gap-2">
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => setTalleSeleccionado("Todos")}
                  >
                    Todos
                  </button>

                  {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map((talle) => (
                    <button
                      key={talle}
                      className="btn btn-outline-dark btn-sm"
                      onClick={() => setTalleSeleccionado(talle)}
                    >
                      {talle}
                    </button>
                  ))}
                </div>

                <h6 className="mt-4">Precio máximo</h6>
                  <p className="fw-bold">
                    ${precioMaximo.toLocaleString()}
                  </p>

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
                  <div
                    key={producto.id}
                    className="col-12 col-sm-6 col-xl-4"
                  >
                    <ProductCard producto={producto} agregarAlCarrito={agregarAlCarrito}/>
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