import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "../components/Slider";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const Home = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3600/producto/all?param=x").then((res) => {
      const primeros = res.data.slice(0, 6); 
      setProductos(primeros);
    });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Slider />

      <section className="py-16 px-6 max-w-[1400px] mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400 drop-shadow-md mb-12">
          Productos Destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productos.map((producto) => (
            <ProductCard key={producto.idproducto} producto={producto} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="/productos"
            className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-purple-700 transition"
          >
            Ver todos los productos
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
