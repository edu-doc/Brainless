import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { api } from "../utils/axios";

interface Questao {
  id: number;
  enunciado: string;
  tema: string;
  ano: number;
  isPublica: boolean;
}

const HomeAluno = () => {
  const navigate = useNavigate();

  const [enunciado, setEnunciado] = useState<string>("");
  const [tema, setTema] = useState<string>("");
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestoes = async () => {
      try {
        const res = await api.get("/professor");
        console.log(res.data);
        setQuestoes(res.data);
      } catch (error) {
        console.error("Erro ao buscar questões:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestoes();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <>
      <div className="flex flex-col h-full">
        <NavBar isProfessor={false} />
        <div className="bg-gradient-to-b from-[#007BFF] from-41% to-[#0056B3] to-90% flex flex-1 justify-around">
          <div className="p-4 w-10/12">
            {/* Ajuste ml-72 para a largura do menu e mt-16 para a altura da barra de navegação */}
            <main className="flex-1 bg-white h-full rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-3">
                <h1 className="text-2xl font-bold mb-4">Últimas Questões</h1>
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

              <div className="overflow-x-auto rounded-md">
                <table className="table-fixed w-full h-full rounded-md border border-black">
                  <thead className="bg-[#0056B3] text-white border-solid border-black">
                    <tr>
                      <th className="px-4 py-2 text-left">Enunciado</th>
                      <th className="px-4 py-2 text-left">Tema</th>
                      <th className="px-4 py-2 text-center">Ano</th>
                      <th className="px-4 py-2 text-center">Responder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questoes.map(
                      (questao) =>
                        questao.isPublica && (
                          <tr key={questao.id} className="border-b bg-gray-300">
                            <td className="px-4 py-2 text-left">
                              {questao.enunciado.length > 30
                                ? `${questao.enunciado.substring(0, 27)}...`
                                : questao.enunciado}
                            </td>
                            <td className="px-4 py-2 text-left">
                              {questao.tema ?? ""}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <div className="flex justify-center">
                                {questao.ano}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-center">
                              <div className="flex justify-center">
                                <button
                                  onClick={() =>
                                    navigate(`/responder-questao/${questao.id}`)
                                  }
                                  className="p-2 bg-[#0056B3] w-8 h-8 text-white rounded-md flex items-center justify-center hover:bg-[#007BFF]"
                                >
                                  <img
                                    src="src/assets/icon-responder.png"
                                    alt="responder"
                                    className="w-full h-full filter invert drop-shadow-md"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAluno;
