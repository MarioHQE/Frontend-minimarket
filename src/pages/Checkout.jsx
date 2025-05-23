import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

const Checkout = () => {
  const { carrito, setCarrito } = useContext(CartContext);
  const [locales, setLocales] = useState([]);
  const [local, setLocal] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3600/sucursal/all?param=x")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar sucursales");
        return res.json();
      })
      .then((data) => {
        setLocales(data);
      })
      .catch((error) => {
        console.error(error);
        alert("No se pudo cargar las sucursales, intenta más tarde.");
      });
  }, []);

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const metodosPago = ["Tarjeta de Crédito", "Débito", "Efectivo", "Paypal"];

  const handleComprar = () => {
    if (!local || !metodoPago) {
      alert("Por favor selecciona local y método de pago");
      return;
    }

    alert(`Compra exitosa!\nLocal: ${local}\nMétodo: ${metodoPago}\nTotal: S/ ${total.toFixed(2)}`);

    setCarrito([]); 
    navigate("/productos"); 
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-purple-700">Checkout</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Selecciona el local:</label>
        <select
          className="w-full border rounded p-2"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
        >
          <option value="">-- Selecciona un local --</option>
          {locales.map((l) => (
            <option key={l.idsucursal} value={l.nombre}>
              {l.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Método de pago:</label>
        <select
          className="w-full border rounded p-2"
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
        >
          <option value="">-- Selecciona un método --</option>
          {metodosPago.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-xl font-semibold mb-4">Resumen de productos</h2>
      <ul className="mb-6 max-h-64 overflow-auto border rounded p-4">
        {carrito.map((item) => (
          <li key={item.idproducto} className="flex justify-between mb-2">
            <span>
              {item.nombre} x {item.cantidad}
            </span>
            <span>S/ {(item.precio * item.cantidad).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <p className="text-right font-bold text-lg mb-6">Total: S/ {total.toFixed(2)}</p>

      <div className="flex justify-between">
        <Link
          to="/carrito"
          className="px-6 py-2 border rounded text-purple-600 font-semibold hover:bg-purple-100"
        >
          Regresar al carrito
        </Link>
        <button
          onClick={handleComprar}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded"
        >
          Confirmar compra
        </button>
      </div>
    </div>
  );
};

export default Checkout;
