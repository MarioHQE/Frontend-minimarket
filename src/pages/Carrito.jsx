import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Carrito = () => {
  const { carrito, setCarrito } = useContext(CartContext);

  const incrementar = (id) => {
    const nuevo = carrito.map((item) =>
      item.idproducto === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarrito(nuevo);
  };

  const disminuir = (id) => {
    const nuevo = carrito
      .map((item) =>
        item.idproducto === id
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
      .filter((item) => item.cantidad > 0);
    setCarrito(nuevo);
  };

  const eliminar = (id) => {
    const nuevo = carrito.filter((item) => item.idproducto !== id);
    setCarrito(nuevo);
  };

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center"> Tu Carrito</h1>

      {carrito.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="mb-4">Tu carrito está vacío.</p>
          <Link
            to="/productos"
            className="text-purple-600 font-medium hover:underline"
          >
            ← Volver a productos
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm md:text-base shadow-lg rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-purple-100 text-purple-700">
                <th className="p-4 text-left">Producto</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Cantidad</th>
                <th className="p-4">Subtotal</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.idproducto} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{item.nombre}</td>
                  <td className="p-4 text-gray-600">S/ {item.precio.toFixed(2)}</td>
                  <td className="p-4 text-center">{item.cantidad}</td>
                  <td className="p-4 font-semibold text-purple-600">
                    S/ {(item.precio * item.cantidad).toFixed(2)}
                  </td>
                  <td className="p-4 flex justify-center gap-2">
                    <button
                      onClick={() => incrementar(item.idproducto)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => disminuir(item.idproducto)}
                      className="bg-purple-200 hover:bg-purple-300 text-purple-800 px-3 py-1 rounded"
                    >
                      −
                    </button>
                    <button
                      onClick={() => eliminar(item.idproducto)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                        Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Total: <span className="text-purple-600">S/ {total.toFixed(2)}</span>
            </h2>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition">
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
