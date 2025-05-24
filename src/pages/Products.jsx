import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Products = () => {
  const [sucursales, setSucursales] = useState([]);
  const [sucursalId, setSucursalId] = useState("");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3600/sucursal/all?param=x")
      .then(res => {
        setSucursales(res.data);
        if (res.data.length > 0) {
          setSucursalId(res.data[0].idsucursal.toString()); 
        }
      })
      .catch(err => {
        console.error("Error cargando sucursales:", err);
        setError("No se pudieron cargar las sucursales");
      });
  }, []);

  useEffect(() => {
    if (!sucursalId) {
      setProductos([]);
      return;
    }

    setLoading(true);
    setError(null);

    axios.get(`http://localhost:3600/productosucursal/sucursal/${sucursalId}`)
      .then(res => {
        setProductos(res.data);
      })
      .catch(() => setError("Error al cargar productos"))
      .finally(() => setLoading(false));
  }, [sucursalId]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Productos de Minimarket Luisa</h1>

      {/* Selector de sucursal centrado */}
      <div className="mb-8 flex justify-center">
        <select
          className="border border-gray-300 rounded p-2 text-lg"
          value={sucursalId}
          onChange={(e) => setSucursalId(e.target.value)}
        >
          {sucursales.length === 0 && <option value="">No hay sucursales</option>}
          {sucursales.length > 0 && <option value="">-- Selecciona una sucursal --</option>}
          {sucursales.map(sucursal => (
            <option key={sucursal.idsucursal} value={sucursal.idsucursal.toString()}>
              {sucursal.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Estados de carga, error y vacío */}
      {loading && <p className="text-center text-purple-600">Cargando productos...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && productos.length === 0 && !error && (
        <p className="text-center text-gray-500">No hay productos para esta sucursal.</p>
      )}

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map(productoSucursal => (
          <ProductCard
            key={productoSucursal.idProductoSucursal}
            productosucursal={productoSucursal}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
