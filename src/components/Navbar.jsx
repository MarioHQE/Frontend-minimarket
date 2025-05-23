import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { cantidadTotal } = useContext(CartContext);
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/productos?buscar=${encodeURIComponent(search)}`);
    }
  };

 return (
  <header className="bg-white shadow-md animate-fade-in-down">
    <nav className="p-5 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-300">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-purple-600 hover:scale-105 transition-transform duration-300"
      >
        <span className="text-purple-500">Minimarket</span>{" "}
        <span className="text-orange-500">Luisa</span>
      </Link>

      {/* Buscador */}
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full md:w-1/2 bg-gray-100 rounded overflow-hidden shadow-inner"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 bg-transparent outline-none transition-all"
          placeholder="Buscar productos..."
        />
        <button
          type="submit"
          className="px-3 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-all"
        >
          <FaSearch />
        </button>
      </form>

      {/* Menú de navegación */}
      <div className="flex items-center gap-5 text-sm md:text-base transition-all duration-300">
        <Link
          to="/"
          className="hover:text-purple-600 font-medium transition-all duration-300"
        >
          Inicio
        </Link>
        <Link
          to="/productos"
          className="hover:text-purple-600 font-medium transition-all duration-300"
        >
          Productos
        </Link>
        <Link
          to="/sucursales"
          className="hover:text-purple-600 font-medium transition-all duration-300"
        >
          Sucursales
        </Link>

        {/* Autenticación */}
        {usuario ? (
          <div className="flex items-center gap-2 animate-fade-in">
            <span className="text-purple-700 font-medium">{usuario.email}</span>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="text-red-600 font-medium hover:underline transition-all duration-300"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <Link
            to="/mi-cuenta"
            className="hover:text-purple-600 font-medium transition-all duration-300"
          >
            Mi cuenta
          </Link>
        )}

        {/* Carrito */}
        <Link
          to="/carrito"
          className="relative text-purple-600 text-xl hover:scale-110 transition-transform"
        >
          <FaShoppingCart />
          {cantidadTotal > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 animate-pulse">
              {cantidadTotal}
            </span>
          )}
        </Link>
      </div>
    </nav>
  </header>
);

};

export default Navbar;
