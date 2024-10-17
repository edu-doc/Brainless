import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ModalDelete from "../components/ModalDelete";
import { useEffect, useState } from "react";
import { api } from "../utils/axios";
import MenuLateral from "../components/MenuLateral";
import Alert from "../components/Alert";

interface Turma {
  id: number;
  nome: string;
}

const GridTurma = () => {
  const navigate = useNavigate();

  const [Turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [typeError, setTypeError] = useState("");

  const openModal = (id: number) => {
    setItemIdToDelete(id); // Armazena o id do item a ser excluído
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (itemIdToDelete !== null) {
      try {
        // console.log(itemIdToDelete);
        await api.delete(`/professor?id=${itemIdToDelete}`);
        // console.log(`Item ${itemIdToDelete} excluído com sucesso!`);

        fetchTurmas();
      } catch (error) {
        console.error("Erro ao excluir o item:", error);
        setMessage("Error em excluir Item");
      } finally {
        setIsModalOpen(false);
        setItemIdToDelete(null);
      }
    }
  };

  const fetchTurmas = async () => {
    try {
      const res = await api.get("/turmas");
      // console.log(res.data);
      setTurmas(res.data);
    } catch (error) {
      console.error("Erro ao buscar questões:", error);
      setMessage("Erro em buscar Turma");
      setTypeError("warning");
      setTurmas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurmas();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <>
      <div className="flex flex-col h-full">
        <NavBar />
        <div className="bg-gradient-to-b from-[#007BFF] from-41% to-[#0056B3] to-90% flex flex-1 justify-around h-5/6">
          <MenuLateral isProfessor={true}></MenuLateral>

          <div className="p-4 w-10/12">
            <main className="flex-1 bg-white h-full rounded-lg shadow-lg p-6">
              <div
                className="flex justify-between items-center mb-3"
                style={{ height: "10%" }}
              >
                <h1 className="text-2xl font-bold mb-4">Turmas</h1>
                <button
                  onClick={() => navigate("/cadastrar-turma")}
                  className="flex w-2/12 justify-center rounded-md bg-[#0056B3] p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#007BFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Cadastrar Turma
                </button>
              </div>

              {message && <Alert message={message} type={typeError} />}

              <div
                className="overflow-y-auto rounded-md"
                style={{ height: "75%" }}
              >
                <table className="table-fixed w-full rounded-md border border-black">
                  <thead className="bg-[#0056B3] text-white border-solid border-black">
                    <tr>
                      <th className="px-4 py-2 text-left">Enunciado</th>
                      <th className="px-4 py-2 text-left">Tema</th>
                      <th className="px-4 py-2 text-center">Ano</th>
                      <th className="px-4 py-2 text-center">Visibilidade</th>
                      <th
                        className="px-4 py-2 text-center"
                        style={{ width: "100px" }}
                      >
                        Editar
                      </th>
                      <th
                        className="px-4 py-2 text-center"
                        style={{ width: "100px" }}
                      >
                        Excluir
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Turmas.length > 0 &&
                      Turmas.map((turma) => (
                        <tr key={turma.id} className="border-b bg-gray-300">
                          <td className="px-4 py-2 text-left">
                            {turma.nome.length > 30
                              ? `${turma.nome.substring(0, 27)}...`
                              : turma.nome}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() =>
                                navigate(`/editar-turma/${turma.id}`)
                              }
                              className="p-2 bg-[#0056B3] w-8 h-8 text-white rounded-md flex items-center justify-center hover:bg-[#007BFF]"
                            >
                              <img
                                src="src/assets/icon-editar.png"
                                alt="editar"
                                className="w-full h-full filter invert drop-shadow-md"
                              />
                            </button>
                          </td>
                          <td className="px-4 py-2 text-center">
                            <button
                              onClick={() => openModal(turma.id)}
                              className="p-2 bg-red-600 w-8 h-8 drop-shadow-md text-white rounded-md flex items-center justify-center hover:bg-red-500"
                            >
                              <img
                                src="src/assets/icon-excluir.png"
                                alt="excluir"
                                className="w-full h-full filter invert drop-shadow-md"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>

      <ModalDelete
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default GridTurma;
