import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import Carrito from "./pages/Carrito";
import Sucursales from "./pages/Sucursales";




function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/sucursales" element={<Sucursales />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
