import { useNavigate } from "react-router-dom";

type Props = {
  isProfessor: boolean;
};

const MenuLateral = (props: Props) => {
  const navigate = useNavigate();

  const menuItems = props.isProfessor
    ? [
        { title: "Lista de Questões", link: "/lista-questoes" },
        { title: "Questões", link: "/questoes" },
        { title: "Turmas", link: "/grid-turma" },
        { title: "Temas", link: "/temas" },
        { title: "Outros Itens", link: "/outros-itens" }, // Adicione outros itens conforme necessário
      ]
    : [
        { title: "Lista de Questões", link: "/lista-questoes" },
        { title: "Questões", link: "/questoes" },
        { title: "Turma", link: "/turmas" },
        // Adicione mais itens conforme necessário
      ];

  return (
    <div
      className="w-2/12 m-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg"
      style={{ height: "85vh" }}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  className="flex items-center justify-center rounded-md font-bold bg-slate-300 text-black p-2 mb-5 hover:bg-slate-100 cursor-pointer"
                  onClick={() => navigate(item.link)}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <button
            className="w-full h-full p-2 rounded-md bg-red-600 font-bold hover:bg-rose-500"
            onClick={() => navigate("/")}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuLateral;
