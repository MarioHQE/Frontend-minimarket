import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import Carrito from "./pages/Carrito";
import Sucursales from "./pages/Sucursales";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import MiCuenta from "./pages/MiCuenta";
import Checkout from "./pages/Checkout";
import ConfirmarCorreo from "./pages/ConfirmarCorreo";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/sucursales" element={<Sucursales />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/mi-cuenta" element={<MiCuenta />} />
           <Route path="/confirmar-correo" element={<ConfirmarCorreo />} />

        
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
