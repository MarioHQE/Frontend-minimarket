import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cambia este ID por el de tu sucursal real
  const idSucursal = 1;

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch(`http://localhost:3600/productosucursal/sucursal/${idSucursal}`);
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <section className="py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Productos Destacados</h2>

      {cargando ? (
        <p className="text-center">Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((p) => (
            <ProductCard key={p.idProductoSucursal} productosucursal={p} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
