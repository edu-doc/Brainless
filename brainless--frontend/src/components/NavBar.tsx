import { useNavigate } from "react-router-dom";
import "../style/login.css";

type Props = {
  isProfessor: boolean;
};

const NavBar = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="bg-gray-300 w-full p-4 flex items-center justify-between shadow-lg">
        {/* Logo */}
        <div className="flex justify-center items-center gap-10">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="../src/assets/logo-brainless-nome.png"
              className="h-16 "
              alt="Logo"
            />
          </a>
          {props.isProfessor && (
            <div className="h-5/6">
              <a
                href=""
                onClick={() => navigate("/")}
                className="w-full h-full px-8 py-4 flex items-center justify-center	gap-3 rounded-lg shadow-lg text-white bg-blue-600 font-bold hover:bg-blue-500"
              >
                Estatísticas
              </a>
            </div>
          )}
        </div>

        <div className="w-1/12 h-5/6">
          <button
            className="w-full h-full p-2 flex items-center justify-center	gap-3 rounded-lg shadow-lg text-white bg-blue-600 font-bold hover:bg-blue-500"
            onClick={() => navigate("/")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
