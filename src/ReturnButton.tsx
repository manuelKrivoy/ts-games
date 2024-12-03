import { Link } from "react-router-dom";

const ReturnButton = () => {
  return (
    <Link
      to="/"
      className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg"
    >
      Volver atrás
    </Link>
  );
};

export default ReturnButton;
