import { palabras } from "./palabras.js";
import { useEffect, useState } from "react";

function App() {
  const [palabra, setPalabra] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [vidas, setVidas] = useState<number>(0);
  const [letras, setLetras] = useState<string[]>([]);

  const vidasImage = Array.from({ length: vidas });

  const generarPalabra = () => {
    const randomIndex = Math.floor(Math.random() * palabras.length);
    const nuevaPalabra = palabras[randomIndex].toUpperCase();
    setPalabra(nuevaPalabra);
    setLetras(Array(nuevaPalabra.length).fill("_")); // Ahora usas nuevaPalabra para generar letras
    console.log(letras);
  };

  useEffect(() => {
    generarPalabra();
    setVidas(5);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const letra = inputValue.toUpperCase();
    if (palabra.includes(letra)) {
      const newLetras = letras.map((letraPalabra, index) => {
        if (palabra[index] === letra) {
          return letra;
        }

        return letraPalabra;
      });

      setLetras(newLetras);
    } else {
      setVidas((prevVidas) => prevVidas - 1);
      alert("¡Incorrecto!");
      if (vidas === 1) {
        alert("¡Perdiste!");
        generarPalabra();
        setVidas(5);
      }
    }
    setInputValue(""); // Limpiar el input después de cada intento
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      {letras.join("") === palabra ? ( // Si las letras adivinadas coinciden con la palabra completa
        <div>
          <p className="text-green-500 text-center text-2xl font-bold">¡Ganaste!</p>
          <button
            className={
              "w-full font-bold py-2 rounded-md transition-all duration-300 ease-in-out shadow-lg transform bg-blue-500 hover:bg-blue-600 text-white hover:-translate-y-1 "
            }
            onClick={generarPalabra}
          >
            Volver a jugar
          </button>
        </div>
      ) : (
        <div className="bg-gray-200 p-8 rounded-lg shadow-2xl w-80 max-w-full">
          <h1 className="text-gray-800 text-2xl text-center font-bold mb-4">¡Bienvenido al Wordle!</h1>

          <div className="flex justify-center mb-4">
            {vidasImage.map((_, index) => (
              <img key={index} src="/img/vida.png" alt="vidas" className="w-12 h-12 mx-1" />
            ))}
          </div>

          {palabra && (
            <>
              {palabra}
              <p className="text-gray-800 text-center font-semibold text-lg mb-4">
                {letras.map((letra, index) => (
                  <span key={index} className="mx-1">
                    {letra}
                  </span>
                ))}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-ZñÑ]?$/.test(value)) {
                      setInputValue(value);
                    }
                  }}
                  maxLength={1}
                  className="w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  placeholder="Ingresa una letra"
                />

                <button
                  type="submit"
                  disabled={!inputValue}
                  className={`w-full font-bold py-2 rounded-md transition-all duration-300 ease-in-out shadow-lg transform ${
                    inputValue
                      ? "bg-blue-500 hover:bg-blue-600 text-white hover:-translate-y-1"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                >
                  COMPARAR
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
