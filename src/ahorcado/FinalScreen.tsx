interface FinalScreenProps {
  text: string;
  color: "green" | "red"; // Restringimos a los colores permitidos
  palabra: string;
  generarPalabra: () => void;
}

const FinalScreen: React.FC<FinalScreenProps> = ({ text, color, palabra, generarPalabra }) => {
  const colors = {
    green: "text-green-500",
    red: "text-red-700",
  };

  return (
    <div>
      <p className={`text-center text-2xl font-bold mb-2 ${colors[color]}`}>{text}</p>
      <p className="text-center text-2xl font-bold mb-3">La palabra era: {palabra}</p>
      <button
        className="w-full font-bold py-2 rounded-md transition-all duration-300 ease-in-out shadow-lg transform bg-blue-500 hover:bg-blue-600 text-white hover:-translate-y-1"
        onClick={generarPalabra}
      >
        Volver a jugar
      </button>
    </div>
  );
};

export default FinalScreen;
