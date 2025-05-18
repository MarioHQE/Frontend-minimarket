import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const Products = () => {
  const [productos, setProductos] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [sucursalId, setSucursalId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3600/sucursal/all?param=x")
      .then(res => setSucursales(res.data));
  }, []);

  useEffect(() => {
    if (sucursalId) {
      axios.get(`http://localhost:3600/productosucursal/sucursal/${sucursalId}`)
        .then(res => setProductos(res.data.map(ps => ps.producto)));
    }
  }, [sucursalId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Productos de Minimarket Luisa</h2>

      <div className="mb-4 flex justify-center">
        <select
          onChange={(e) => setSucursalId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Selecciona Sucursal</option>
          {sucursales.map((suc) => (
            <option key={suc.idsucursal} value={suc.idsucursal}>
              {suc.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default Products;
