import { useState, useEffect } from "react";
import "./SnakeGame.css"; // CSS personalizado
import ReturnButton from "./ReturnButton";

const SnakeGame: React.FC = () => {
  const boardSize = 15;
  const initialSnake = [{ x: 2, y: 2 }];
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  });
  const [gameOver, setGameOver] = useState(false);

  // Función para cambiar la dirección con las teclas
  const changeDirection = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case "ArrowDown":
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case "ArrowLeft":
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case "ArrowRight":
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  // Función para mover la serpiente
  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

    // Checkear colisiones con el borde
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || checkCollision(head)) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    // Checkear si la serpiente come la comida
    if (head.x === food.x && head.y === food.y) {
      setFood({ x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) });
    } else {
      newSnake.pop(); // Si no come, se elimina la última parte de la cola
    }

    setSnake(newSnake);
  };

  // Función para verificar colisión con el cuerpo
  const checkCollision = (head: { x: number; y: number }) => {
    return snake.some((segment) => segment.x === head.x && segment.y === head.y);
  };

  // UseEffect para manejar el movimiento y las teclas
  useEffect(() => {
    if (gameOver) return;
    const intervalId = setInterval(moveSnake, 150);

    const handleKeyDown = (e: KeyboardEvent) => changeDirection(e);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [snake, direction, gameOver]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="w-full justify-start p-4">
        <ReturnButton />
      </div>

      <div className="flex justify-center items-center flex-grow">
        {gameOver ? (
          <h2 className="text-white text-4xl font-bold mb-8 drop-shadow-lg">¡Game Over! Presiona F5 para reiniciar.</h2>
        ) : (
          <div className="board" style={{ width: `${boardSize * 20}px`, height: `${boardSize * 20}px` }}>
            {Array(boardSize)
              .fill(0)
              .map((_, row) => (
                <div key={row} className="row">
                  {Array(boardSize)
                    .fill(0)
                    .map((_, col) => {
                      const isSnake = snake.some((segment) => segment.x === col && segment.y === row);
                      const isFood = food.x === col && food.y === row;
                      return <div key={col} className={`cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""}`}></div>;
                    })}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
