import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Ahorcado from "./Ahorcado";
import SnakeGame from "./SnakeGame";
import Home from "./Home";

const App = () => {
  interface MiniJuego {
    name: string;
    component: React.ComponentType;
    route: string;
    image: string;
  }

  const miniJuegos: MiniJuego[] = [
    {
      name: "Ahorcado",
      component: Ahorcado,
      route: "/ahorcado",
      image:
        "https://e7.pngegg.com/pngimages/602/272/png-clipart-hangman-ahorcado-hangman-word-guessing-game-hangman-3d-android-game-logo.png",
    },
    {
      name: "Snake",
      component: SnakeGame,
      route: "/snake",
      image: "https://play-lh.googleusercontent.com/S9ZmNx5LYCj7h2IJZb0QqkXAGki6JRaMQ25ycKfrngDkNBA6jk7rM87YcAH1prV_OA",
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
        <Route path="/" element={<Home miniJuegos={miniJuegos} />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
