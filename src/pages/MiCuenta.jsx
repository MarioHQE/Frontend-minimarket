import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 👈 importar el contexto

const MiCuenta = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 usar login desde el contexto
  const [modo, setModo] = useState("login");
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modo === "login") {
        const res = await axios.post("http://localhost:3600/api/usuario/login", {
          email: form.email,
          password: form.password,
        });

        const { token } = res.data;
        if (!token) {
          alert("No se recibió token en la respuesta");
          return;
        }

        login(token); // 👈 guardar el usuario globalmente desde el contexto

        const roles = JSON.parse(localStorage.getItem("roles")) || [];

        alert("Inicio de sesión exitoso");

        // Redirigir
        if (roles.includes("ROLE_ADMIN")) {
          navigate("/admin/dashboard");
        } else {
          navigate("/productos");
        }
      } else {
        await axios.post("http://localhost:3600/api/usuario/signup", form);
        navigate("/confirmar-correo");
      }
    } catch (error) {
      alert("Error: " + (error.response?.data || error.message || "Servidor no disponible"));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-around mb-6">
        <button
          onClick={() => setModo("login")}
          className={`px-4 py-2 font-semibold ${
            modo === "login"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500"
          }`}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => setModo("registro")}
          className={`px-4 py-2 font-semibold ${
            modo === "registro"
              ? "text-purple-600 border-b-2 border-purple-600"
              : "text-gray-500"
          }`}
        >
          Registrarse
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {modo === "registro" && (
          <>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="w-full border p-2 rounded"
              value={form.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              className="w-full border p-2 rounded"
              value={form.apellido}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              className="w-full border p-2 rounded"
              value={form.telefono}
              onChange={handleChange}
              required
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full border p-2 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          {modo === "login" ? "Iniciar Sesión" : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default MiCuenta;
