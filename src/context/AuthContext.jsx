// src/context/AuthContext.jsx
import { createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const data = localStorage.getItem("usuario");
    return data ? JSON.parse(data) : null;
  });

  const login = async (credenciales) => {
    const response = await fetch("http://localhost:3600/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credenciales),
    });

    if (!response.ok) throw new Error("Credenciales inválidas");

    const data = await response.json();
    setUsuario(data);
    localStorage.setItem("usuario", JSON.stringify(data));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  const register = async (nuevoUsuario) => {
    const response = await fetch("http://localhost:3600/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    });

    if (!response.ok) throw new Error("No se pudo registrar");

    const data = await response.json();
    setUsuario(data);
    localStorage.setItem("usuario", JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
