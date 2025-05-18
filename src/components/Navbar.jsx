import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { cantidadTotal } = useContext(CartContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      window.location.href = `/productos?buscar=${encodeURIComponent(search)}`;
    }
  };

  return (
    <header className="bg-white shadow-md">
     
      <nav className="p-5 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <Link to="/" className="text-2xl font-bold text-purple-600">
          <span className="text-purple-500">Minimarket</span>{" "}
          <span className="text-orange-500">Luisa</span>
        </Link>

    
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full md:w-1/2 bg-gray-100 rounded overflow-hidden"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 bg-transparent outline-none"
            placeholder="Buscar productos..."
          />
          <button
            type="submit"
            className="px-3 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded overflow-hidden"
          >
            <FaSearch />
          </button>
        </form>

        {/* Navegación */}
        <div className="flex items-center gap-5 text-sm md:text-base">
          <Link to="/" className="hover:text-purple-600 font-medium">
            Inicio
          </Link>
          <Link to="/productos" className="hover:text-purple-600 font-medium">
            Productos
          </Link>
          <Link to="/sucursales" className="hover:text-purple-600 font-medium">
            Sucursales
          </Link>
          <Link to="/api/usuario" className="hover:text-purple-600 font-medium">
            Mi cuenta
          </Link>

          {/* Ícono carrito */}
          <Link to="/carrito" className="relative text-purple-600 text-xl">
            <FaShoppingCart />
            {cantidadTotal > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cantidadTotal}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Segunda fila (categorías) */}
      <div className="bg-gray-100 px-6 py-2 flex gap-3 overflow-x-auto text-sm">
        <Link to="/productos?categoria=alimentos" className="hover:underline">
          Alimentos
        </Link>
        <Link to="/productos?categoria=bebidas" className="hover:underline">
          Bebidas
        </Link>
        <Link to="/productos?categoria=limpieza" className="hover:underline">
          Limpieza
        </Link>
        <Link to="/productos?categoria=dulces" className="hover:underline">
          Dulces
        </Link>
        <Link to="/productos?categoria=personal" className="hover:underline">
          Cuidado Personal
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
