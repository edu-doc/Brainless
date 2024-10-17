import { useEffect, useState } from "react";
import { api } from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import Alternative from "../components/Alternative";
import { useAuth } from "../context/AuthContext";

const ResponderQuestao = () => {
  const [tema, setTema] = useState("");
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [respostaSubjetiva, setRespostaSubjetiva] = useState(""); // Estado para resposta subjetiva
  const { userId } = useAuth();
  const navigate = useNavigate();

  let acerto: boolean;
  const params = useParams<Record<string, string | undefined>>();

  useEffect(() => {
    const fetchQuestao = async () => {
      if (params.id) {
        try {
          const res = await api.get(`questaoAluno?id=${params.id}`);
          console.log(res.data);
          setEnunciado(res.data.enunciado);
          setTema(res.data.tema);
          setAltA(res.data.alternativas[0]);
          setAltB(res.data.alternativas[1]);
          setAltC(res.data.alternativas[2]);
          setAltD(res.data.alternativas[3]);
          setAltE(res.data.alternativas[4]);
          setResposta(res.data.resposta);
          setJustificativa(res.data.justificativa);

          const verificarResposta = await api.get(
            `/questaoAluno/verificarResposta`,
            {
              params: {
                alunoId: userId,
                questaoId: params.id,
              },
            }
          );

          if (verificarResposta.data.resp) {
            console.log(verificarResposta.data + "estou louco");
            setRespostaSubjetiva(verificarResposta.data.resp);
            setAlternativaSelecionada(verificarResposta.data.resp);
            setSubmitted(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchQuestao();
  }, [params.id]);

  // Função para verificar se a questão é subjetiva
  const isQuestaoSubjetiva =
    !alternativaA &&
    !alternativaB &&
    !alternativaC &&
    !alternativaD &&
    !alternativaE;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isQuestaoSubjetiva && !respostaSubjetiva.trim()) {
      setMessage("O campo de resposta é obrigatório.");
      return;
    }

    if (!isQuestaoSubjetiva && alternativaSelecionada === resposta) {
      acerto = true;
      console.log("acertou");
    } else {
      acerto = false;
      console.log("errou");
    }

    setMessage("");

    try {
      const data = {
        resposta: isQuestaoSubjetiva
          ? respostaSubjetiva
          : alternativaSelecionada,
        acerto: acerto,
        idUsu: Number(userId),
        idQuest: Number(params.id),
      };

      console.log(
        "questao id: " +
          data.idQuest +
          "| resposta: " +
          data.resposta +
          "| acerto: " +
          data.acerto +
          "| alunoId: " +
          data.idUsu
      );

      await api.post("/questaoAluno", data);

      if (!submitted && isQuestaoSubjetiva) {
        setSubmitted(true);
        setShowSuccessModal(true);
      } else {
        setSubmitted(true);
      }

      setMessage("Resposta cadastrada com sucesso.");
    } catch (error) {
      setMessage(
        "Erro ao cadastrar a resposta. Tente novamente. Error:" + error
      );
    }
  };

  const verJustificativa = async () => {
    setShowModal(true);
  };

  return (
    <>
      <NavBar isProfessor={false} />
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
                <p className="text-black text-xl font-semibold border border-color-black rounded p-2">
                  {tema}
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

            {/* Verificação se a questão é subjetiva ou objetiva */}
            {isQuestaoSubjetiva ? (
              <div className="flex flex-col">
                <label
                  htmlFor="respostaSubjetiva"
                  className="text-black text-xl font-semibold p-2"
                >
                  Resposta:
                </label>
                <textarea
                  id="respostaSubjetiva"
                  className="w-full p-4 border border-black rounded-lg focus:outline-none focus:ring-2 resize-none"
                  style={{ minHeight: "200px" }} // Define uma altura mínima de 200px
                  value={respostaSubjetiva}
                  onChange={(e) => setRespostaSubjetiva(e.target.value)}
                  placeholder="Escreva sua resposta aqui..."
                />
              </div>
            ) : (
              <>
                {/* Alternativas A até E */}
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
              </>
            )}

            {/* Responder */}
            <div className="flex justify-center mt-4">
              <div>
                <button
                  type="submit"
                  className="bg-sky-800 text-white font-semibold px-12 py-4 rounded-lg text-xl shadow-lg hover:bg-sky-600 w-full"
                  onClick={submitted ? verJustificativa : handleSubmit}
                >
                  {submitted ? "RESPOSTA DO PROFESSOR" : "RESPONDER"}
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

              {showSuccessModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-10 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Sucesso!</h2>
                    <p>A Resposta foi enviada para o e-mail do Professor.</p>
                    <button
                      className="mt-4 bg-blue-500 text-white p-2 rounded"
                      onClick={() => setShowSuccessModal(false)} // Fecha o modal
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
