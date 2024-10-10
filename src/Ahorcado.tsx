import { palabras } from "./palabras.js";
import { useEffect, useState } from "react";
import FinalScreen from "./ahorcado/FinalScreen.jsx";
import ReturnButton from "./ReturnButton";
function Ahorcado() {
  const [palabra, setPalabra] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [vidas, setVidas] = useState<number>(0);
  const [letras, setLetras] = useState<string[]>([]);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);

  const generarPalabra = () => {
    const randomIndex = Math.floor(Math.random() * palabras.length);
    const nuevaPalabra = palabras[randomIndex].toUpperCase();
    setPalabra(nuevaPalabra);
    setLetras(Array(nuevaPalabra.length).fill("_"));
    setVidas(6);
    setUsedLetters([]);
  };

  useEffect(() => {
    generarPalabra();
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
      setUsedLetters((prevUsedLetters) => [...prevUsedLetters, letra]);
    }
    setInputValue("");
  };

  const renderVidas = () => {
    return (
      <div className="flex justify-center mb-4">
        <img
          src={`./img/${vidas}.png`}
          alt="vidas"
          className="w-36 h-36 transition-opacity"
          style={{ opacity: vidas === 0 ? 0 : 1 }} // Para suavizar el cambio
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col items-center">
      <div className="w-full flex justify-start p-4">
        <ReturnButton />
      </div>
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-gray-200 p-8 rounded-lg shadow-2xl w-80 max-w-full">
          {letras.join("") === palabra ? (
            <FinalScreen text="GANASTE" color="green" palabra={palabra} generarPalabra={generarPalabra} />
          ) : vidas === 0 ? (
            <FinalScreen text="PERDISTE" color="red" palabra={palabra} generarPalabra={generarPalabra} />
          ) : (
            <>
              <h1 className="text-gray-800 text-2xl text-center font-bold mb-4">¡Ahorcado!</h1>
  
              {palabra && (
                <div>
                  <p className="text-gray-800 text-center font-semibold text-lg mb-4">
                    {renderVidas()}
                    {letras.map((letra, index) => (
                      <span key={index} className="mx-1">
                        {letra}
                      </span>
                    ))}
                  </p>
  
                  {/* Formulario de entrada */}
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
                    <p>Letras incorrectas: {usedLetters.join(", ")}</p>
  
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
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
  }

export default Ahorcado;
