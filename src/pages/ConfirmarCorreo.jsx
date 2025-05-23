import React from "react";

const ConfirmarCorreo = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold mb-4">¡Registro exitoso!</h2>
      <p className="mb-6">
        Por favor, revisa tu correo electrónico y verifica tu cuenta para continuar.
      </p>
      <a href="/" className="text-purple-600 underline">
        Volver al inicio
      </a>
    </div>
  );
};

export default ConfirmarCorreo;