import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Carrito = () => {
  const { carrito, setCarrito } = useContext(CartContext);
  const navigate = useNavigate();

  const incrementar = (id) => {
    const actualizado = carrito.map((item) => {
      if (item.idproducto === id) {
        // Aumenta solo si la cantidad es menor que el stock disponible
        if (item.cantidad < (item.stock || 0)) {
          return { ...item, cantidad: item.cantidad + 1 };
        } else {
          alert(`No hay más stock disponible para ${item.nombre}`);
          return item;
        }
      }
      return item;
    });
    setCarrito(actualizado);
  };

  const disminuir = (id) => {
    const actualizado = carrito
      .map((item) =>
        item.idproducto === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
      .filter((item) => item.cantidad > 0);
    setCarrito(actualizado);
  };

  const eliminar = (id) => {
    const filtrado = carrito.filter((item) => item.idproducto !== id);
    setCarrito(filtrado);
  };

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  const handleFinalizar = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión");
      navigate("/login");
      return;
    }

    // Validar que todos tengan idproducto (en vez de idproductosucursal)
    for (const p of carrito) {
      if (!p.idproducto) {
        alert(`Producto sin idproducto: ${p.nombre || "Sin nombre"}`);
        console.log("Producto sin idproducto:", p);
        return;
      }
      if ((p.stock || 0) < p.cantidad) {
        alert(`No hay suficiente stock para el producto: ${p.nombre}`);
        return;
      }
    }

    try {
      const pedido = {
        nombre: "Cliente",
        apellido: "Ejemplo",
        direccion: "Av. Principal 123",
        telefono: "999999999",
        email: "correo@ejemplo.com",
        fechaderecojo: null,
        fechapago: null,
        productos: carrito.map((item) => ({
          idProductoSucursal: item.idproducto, // Aquí mandamos idproducto como idProductoSucursal
          cantidad: item.cantidad,
        })),
        local: "Sucursal Central",
        metodoPago: "Tarjeta de Crédito",
      };

      const response = await fetch("http://localhost:3600/pedido/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(pedido),
      });

      if (!response.ok) throw new Error("Error al registrar el pedido");

      const data = await response.json();
      const idPedido = data.idpedido;

      const pagoResponse = await fetch(
        `http://localhost:3600/pago?idpedido=${idPedido}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!pagoResponse.ok) throw new Error("Error al obtener URL de Stripe");

      const urlPago = await pagoResponse.text();
      if (!urlPago.startsWith("http"))
        throw new Error("URL inválida de Stripe");

      window.location.href = urlPago;
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Ocurrió un error. Revisa la consola.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">
        Tu Carrito
      </h1>

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
        <>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm md:text-base shadow-lg rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-purple-100 text-purple-700">
                  <th className="p-4 text-left">Producto</th>
                  <th className="p-4">Precio</th>
                  <th className="p-4">Cantidad</th>
                  <th className="p-4">Subtotal</th>
                  <th className="p-4">Stock</th> {/* Nueva columna */}
                  <th className="p-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => (
                  <tr
                    key={item.idproducto}
                    className={`border-b hover:bg-gray-50 transition ${
                      item.stock === 0 ? "bg-red-100" : ""
                    }`}
                  >
                    <td className="p-4 font-medium text-gray-800">{item.nombre}</td>
                    <td className="p-4 text-gray-600">S/ {item.precio.toFixed(2)}</td>
                    <td className="p-4 text-center">{item.cantidad}</td>
                    <td className="p-4 font-semibold text-purple-600">
                      S/ {(item.precio * item.cantidad).toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      {item.stock > 0 ? (
                        <span className="text-green-600 font-semibold">{item.stock}</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Agotado</span>
                      )}
                    </td>
                    <td className="p-4 flex justify-center gap-2">
                      <button
                        onClick={() => incrementar(item.idproducto)}
                        disabled={item.cantidad >= item.stock}
                        className={`px-3 py-1 rounded text-white ${
                          item.cantidad >= item.stock
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-purple-500 hover:bg-purple-600"
                        }`}
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
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Total: <span className="text-purple-600">S/ {total.toFixed(2)}</span>
            </h2>

            <button
              onClick={handleFinalizar}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition"
            >
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
