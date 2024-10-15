import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa"; // Importando ícones
import "../style/login.css";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="bg-gray-300 p-6 flex items-center justify-between shadow-lg">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <a
            onClick={() => navigate("/")}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="../src/assets/logo-brainless-nome.png"
              className="h-16 "
              alt="Flowbite Logo"
            />
          </a>
        </div>

        {/* Campo de busca */}
        <div className="flex-1 mx-80">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full p-2 pl-10 border rounded-full bg-gray-400 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute top-3 left-3 text-gray-800" />
          </div>
        </div>

        {/* Ícone de perfil */}
        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full ml-4">
          <a href="/profile" className="text-black text-2xl">
            <FaUser />
          </a>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
