import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import ModalDelete from "../components/ModalDelete";
import { useCallback, useEffect, useState } from "react";
import { api } from "../utils/axios";

interface Questao {
  id: number;
  enunciado: string;
  tema: string;
  ano: number;
  isPublica: boolean;
}

const HomeProfessor = () => {
  const navigate = useNavigate();

  const [enunciado, setEnunciado] = useState<string>("");
  const [tema, setTema] = useState<string>("");
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);

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

        fetchQuestoes();
      } catch (error) {
        console.error("Erro ao excluir o item:", error);
      } finally {
        setIsModalOpen(false);
        setItemIdToDelete(null);
      }
    }
  };

  const fetchQuestoes = useCallback(async () => {
    setLoading(true);
    try {
      // Enviar parâmetros de busca para a API
      const res = await api.get("/professor", {
        params: {
          enunciado: enunciado || undefined, // Só envia se não estiver vazio
          tema: tema || undefined, // Só envia se não estiver vazio
        },
      });
      setQuestoes(res.data);
    } catch (error) {
      console.error("Erro ao buscar questões:", error);
      setQuestoes([]);
    } finally {
      setLoading(false);
    }
  }, [enunciado, tema]);

  // UseEffect com debounce para evitar chamadas desnecessárias
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchQuestoes();
    }, 500); // Espera 500ms após o último caractere digitado para fazer a requisição

    return () => clearTimeout(delayDebounceFn); // Limpa o timeout anterior se o usuário continuar digitando
  }, [fetchQuestoes]); // Só refaz a busca quando enunciado ou tema mudarem

  if (loading) return <div>Carregando...</div>;

  return (
    <>
      <div className="flex flex-col h-full">
        <NavBar isProfessor={true} />
        <div className="bg-gradient-to-b from-[#007BFF] from-41% to-[#0056B3] to-90% flex flex-1 justify-around h-5/6">
          <div className="p-4 w-10/12">
            <main className="flex-1 bg-white h-full rounded-lg shadow-lg p-6">
              <div
                className="flex justify-between items-center mb-3"
                style={{ height: "10%" }}
              >
                <h1 className="text-2xl font-bold mb-4">Suas Questões</h1>
                <button
                  onClick={() => navigate("/cadastrar-questao")}
                  className="flex w-2/12 justify-center rounded-md bg-[#0056B3] p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#007BFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Cadastrar Questão
                </button>
              </div>

              <div className="flex space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Buscar Enunciado"
                    value={enunciado}
                    onChange={(e) => setEnunciado(e.target.value)}
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112 4.5a7.5 7.5 0 014.65 12.15z"
                      />
                    </svg>
                  </span>
                </div>

                <div className="relative mb-2">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Buscar Tema"
                    value={tema}
                    onChange={(e) => setTema(e.target.value)}
                  />
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1112 4.5a7.5 7.5 0 014.65 12.15z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

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
                    {questoes.map((questao) => (
                      <tr key={questao.id} className="border-b bg-gray-300">
                        <td className="px-4 py-2 text-left">
                          {questao.enunciado.length > 30
                            ? `${questao.enunciado.substring(0, 27)}...`
                            : questao.enunciado}
                        </td>
                        <td className="px-4 py-2 text-left">
                          {questao.tema ?? ""}
                        </td>
                        <td className="px-4 py-2 text-center">{questao.ano}</td>
                        <td className="px-4 py-2 text-center">
                          {questao.isPublica ? "Pública" : "Privada"}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button
                            onClick={() =>
                              navigate(`/editar-questao/${questao.id}`)
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
                            onClick={() => openModal(questao.id)}
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

export default HomeProfessor;
