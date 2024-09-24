import { palabras } from "./palabras.js";
import { useEffect, useState } from "react";

function App() {
  const [palabra, setPalabra] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [vidas, setVidas] = useState<number>(0);

  const vidasImage = Array.from({ length: vidas });

  const generarPalabra = () => {
    const randomIndex = Math.floor(Math.random() * palabras.length);
    console.log(palabras[randomIndex]);
    setPalabra(palabras[randomIndex]);
  };

  useEffect(() => {
    generarPalabra();
    setVidas(5);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue === palabra) {
      alert("¡Ganaste!");
      generarPalabra();
      setVidas(5);
    } else {
      setVidas(vidas - 1);
      alert("¡Incorrecto!");
      if (vidas === 1) {
        setVidas(vidas - 1);
        alert("¡Perdiste!");
        generarPalabra();
        setVidas(5);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="bg-gray-200 p-8 rounded-lg shadow-2xl w-80 max-w-full">
        <h1 className="text-gray-800 text-2xl text-center font-bold mb-4">¡Bienvenido al Wordle!</h1>

        <div className="flex justify-center mb-4">
          {vidasImage.map((_, index) => (
            <img key={index} src="/img/vida.png" alt="vidas" className="w-12 h-12 mx-1" />
          ))}
        </div>

        {palabra && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 t transition-all"
              placeholder="Ingresa tu palabra"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition-all duration-300 ease-in-out shadow-lg transform hover:-translate-y-1"
            >
              COMPARAR
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
