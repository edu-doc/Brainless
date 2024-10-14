import { useEffect, useState } from "react";
import { api } from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import { cn } from "../utils";
import Alternative from "../components/Alternative";

const ResponderQuestao = () => {
  const [temas, setTema] = useState("");
  const [enunciado, setEnunciado] = useState("");
  const [alternativaA, setAltA] = useState("");
  const [alternativaB, setAltB] = useState("");
  const [alternativaC, setAltC] = useState("");
  const [alternativaD, setAltD] = useState("");
  const [alternativaE, setAltE] = useState("");
  const [resposta, setResposta] = useState("");
  const [alternativaSelecionada, setAlternativaSelecionada] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [justificativa, setJustificativa] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const params = useParams<Record<string, string | undefined>>();

  useEffect(() => {
    const fetchQuestao = async () => {
      if (params.id) {
        try {
          const res = await api.get(`questaoAluno?id=${params.id}`);
          // Preencher os estados com os dados da questão
          setEnunciado(res.data.enunciado);
          setTema(res.data.tema[0]);
          setAltA(res.data.alternativas[0]);
          setAltB(res.data.alternativas[1]);
          setAltC(res.data.alternativas[2]);
          setAltD(res.data.alternativas[3]);
          setAltE(res.data.alternativas[4]);
          setResposta(res.data.resposta);
          setJustificativa(res.data.justificativa);
          // e assim por diante para outros campos
        } catch (error) {
          setMessage(
            "Erro ao conectar com o servidor. Tente novamente mais tarde."
          );
        }
      }
    };

    fetchQuestao();
  }, [params.id]);

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    if (submitted) {
      setShowModal(true);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center p-8 h-5/6 min-h-screen bg-gradient-to-b from-[#007BFF] to-[#0056B3] ">
        <div className="p-8 bg-white w-10/12 rounded-md overflow-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 w-full mt-4 h-12"
          >
            <div>
              <button
                className="flex justify-center items-center border shadow-lg h-12 w-12 rounded-full hover:bg-gray-300"
                onClick={() => navigate("/home-aluno")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-chevrons-left text-black "
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M11 7l-5 5l5 5" />
                  <path d="M17 7l-5 5l5 5" />
                </svg>
              </button>
            </div>

            {/* Tema */}
            <div className="col-span-2 flex justify-center items-center h-12">
              <div className=" w-3/6 flex justify-center items-center">
                <label
                  className="text-black text-xl font-semibold p-2"
                  htmlFor="tema"
                >
                  Tema:
                </label>
                <p className="text-black text-xl font-semibold border border-color-gray rounded p-2">
                  {temas}
                </p>
              </div>
            </div>

            {/* Enunciado */}
            <div className="col-span-2 flex justify-center items-center h-12">
              <div className=" w-3/6 flex justify-center items-center">
                <label
                  className="text-black text-xl font-semibold mr-2 p-2"
                  htmlFor="enunciado"
                >
                  Enunciado:
                </label>
                <p className="text-black text-xl font-semibold p-2">
                  {enunciado}
                </p>
              </div>
            </div>

            <hr />

            {/* Alternativa A e B */}
            {alternativaA && (
              <Alternative
                resposta={resposta}
                text={alternativaA}
                alternativaSelecionada={alternativaSelecionada}
                label="A"
                onClick={() => setAlternativaSelecionada("A")}
                submitted={submitted}
              />
            )}

            {alternativaB && (
              <Alternative
                resposta={resposta}
                text={alternativaB}
                alternativaSelecionada={alternativaSelecionada}
                label="B"
                onClick={() => setAlternativaSelecionada("B")}
                submitted={submitted}
              />
            )}

            {alternativaC && (
              <Alternative
                resposta={resposta}
                text={alternativaC}
                alternativaSelecionada={alternativaSelecionada}
                label="C"
                onClick={() => setAlternativaSelecionada("C")}
                submitted={submitted}
              />
            )}

            {alternativaD && (
              <Alternative
                resposta={resposta}
                text={alternativaD}
                alternativaSelecionada={alternativaSelecionada}
                label="D"
                onClick={() => setAlternativaSelecionada("D")}
                submitted={submitted}
              />
            )}

            {alternativaE && (
              <Alternative
                resposta={resposta}
                text={alternativaE}
                alternativaSelecionada={alternativaSelecionada}
                label="E"
                onClick={() => setAlternativaSelecionada("E")}
                submitted={submitted}
              />
            )}

            {/* Cancelar e Responder */}
            <div className="flex justify-center mt-4">
              <div>
                <button
                  type="submit"
                  className="bg-sky-800 text-white font-semibold px-12 py-4 rounded-lg text-xl shadow-lg hover:bg-sky-600 w-full"
                  onClick={handleSubmit}
                >
                  {submitted ? "JUSTIFICATIVA" : "RESPONDER"}
                </button>
              </div>

              {/* Modal para mostrar justificativa */}
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-10 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Justificativa</h2>
                    <p>{justificativa}</p>
                    <button
                      className="mt-4 bg-blue-500 text-white p-2 rounded"
                      onClick={() => setShowModal(false)} // Fecha o modal
                    >
                      Fechar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResponderQuestao;
