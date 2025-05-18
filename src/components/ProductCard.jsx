// ProductCard.jsx
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ producto }) => {
  const { agregarAlCarrito } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);

  const aumentar = () => setCantidad(c => Math.min(c + 1, 99));
  const disminuir = () => setCantidad(c => Math.max(c - 1, 1));

  const manejarAgregar = () => {
    agregarAlCarrito({ ...producto, cantidad });
    setCantidad(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col p-4">
      <div className="overflow-hidden rounded-lg">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="h-85  object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      <h3 className="text-gray-900 font-semibold text-lg truncate mt-4">{producto.nombre}</h3>
      <p className="text-gray-600 text-sm mt-1 line-clamp-3">{producto.descripcion}</p>
      <p className="text-purple-600 font-bold text-xl mt-3">S/ {producto.precio.toFixed(2)}</p>

      <div className="mt-auto flex items-center gap-3 pt-4">
        <div className="flex items-center border rounded-md overflow-hidden w-max">
          <button
            onClick={disminuir}
            className="px-3 py-1 bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
            aria-label="Disminuir cantidad"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            max={99}
            value={cantidad}
            onChange={(e) => {
              const val = Math.max(1, Math.min(99, Number(e.target.value)));
              setCantidad(val);
            }}
            className="w-12 text-center border-none focus:ring-0 focus:outline-none"
          />
          <button
            onClick={aumentar}
            className="px-3 py-1 bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>

        <button
          onClick={manejarAgregar}
          className="bg-purple-600 text-white rounded-lg px-6 py-2 font-semibold hover:bg-purple-900 transition"
        >
          Añadir
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
