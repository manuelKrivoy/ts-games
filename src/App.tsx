import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Ahorcado from "./Ahorcado";

const App = () => {
  const miniJuegos = [
    {
      name: "Ahorcado",
      component: Ahorcado,
      route: "/ahorcado",
      image:
        "https://e7.pngegg.com/pngimages/602/272/png-clipart-hangman-ahorcado-hangman-word-guessing-game-hangman-3d-android-game-logo.png",
    },
    {
      name: "Juego 2",
      component: () => <h1>Juego 2</h1>,
      route: "/juego2",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs_J0UfUsoQTZhIcTJpiZGDup5DKiQp6vmA&s",
    },
    {
      name: "Juego 3",
      component: () => <h1>Juego 3</h1>,
      route: "/juego3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzs_J0UfUsoQTZhIcTJpiZGDup5DKiQp6vmA&s",
    },
  ];

  return (
    <Router>
      <Routes>
        {miniJuegos.map((juego, index) => (
          <Route key={index} path={juego.route} element={<juego.component />} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
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
                  backgroundSize: "contain", // Asegura que la imagen se ajuste sin recortarse
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Link to={juego.route} className="block p-8 text-center"></Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
