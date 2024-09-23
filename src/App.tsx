import { palabras } from "./palabras.js";
import { useState } from "react";

function App() {
  const [palabra, setPalabra] = useState<string>("");

  const generarPalabra = () => {
    const randomIndex = Math.floor(Math.random() * palabras.length);
    setPalabra(palabras[randomIndex]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 border-2 border-black">
      <div className="bg-blue-400 p-8 rounded-lg shadow-lg w-80 max-w-full">
        <h1 className="text-white text-xl text-center font-bold">Bienvenido al Wordle</h1>

        {palabra ? (
          <div className="bg-blue-200 p-4 mt-4 text-center">{palabra}</div>
        ) : (
          <div className="bg-red-200 p-4 mt-4 text-center">...</div>
        )}

        <button
          className="bg-blue-500 p-4 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={generarPalabra}
        >
          Generar palabra
        </button>
      </div>
    </div>
  );
}

export default App;
