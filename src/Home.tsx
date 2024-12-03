import { Link } from "react-router-dom";

interface MiniJuego {
  image: string; // URL de la imagen
  route: string; // Ruta para el enlace
}

interface HomeProps {
  miniJuegos: MiniJuego[];
}

const Home: React.FC<HomeProps> = ({ miniJuegos }) => {
  return (
    <div>
      <div className="min-h-screen bg-cover bg-center">
        <div className="bg-gradient-to-b from-blue-400 to-blue-600 min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-white text-5xl font-bold mb-8 drop-shadow-lg">¡Mini Juegos Divertidos!</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {miniJuegos.map((juego, index) => (
              <div
                key={index}
                className="bg-yellow-300 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:rotate-2 duration-300"
                style={{
                  backgroundImage: `url(${juego.image})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <Link to={juego.route} className="block p-8 text-center text-black font-bold  rounded-lg"></Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
