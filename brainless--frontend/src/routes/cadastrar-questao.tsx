import { useEffect, useState } from 'react';
import { api } from '../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

import NavBar from "../components/NavBar";

const CadastrarQuestao = () => {

    const [tema, setTema] = useState("");
    const [enunciado, setEnunciado] = useState("");
    const [justificativa, setJustificativa] = useState("");
    const [alternativaA, setAltA] = useState("");
    const [alternativaB, setAltB] = useState("");
    const [alternativaC, setAltC] = useState("");
    const [alternativaD, setAltD] = useState("");
    const [alternativaE, setAltE] = useState("");
    const [isPublica, setIsPublica] = useState("true");
    const [resposta, setResposta] = useState("A");
    const [tipo, setTipo] = useState("Subjetiva");
    const [semestre, setSemestre] = useState("");
    const [turma, setTurma] = useState("");
    const [atividade, setAtividade] = useState("");
    
    // Estado para controlar o tipo de questão

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const params = useParams<Record<string, string | undefined>>();

    useEffect(() => {
      const fetchQuestao = async () => {
        if (params.id) {
          setIsEditing(true);
          try {
            const res = await api.get(`questaoProfessor?id=${params.id}`);
            setEnunciado(res.data.enunciado);
            setTema(res.data.tema);
            setAltA(res.data.alternativas[0] || "");
            setAltB(res.data.alternativas[1] || "");
            setAltC(res.data.alternativas[2] || "");
            setAltD(res.data.alternativas[3] || "");
            setAltE(res.data.alternativas[4] || "");
            setIsPublica(res.data.isPublica);
            setResposta(res.data.resposta);
            setJustificativa(res.data.justificativa);
            setTipo(res.data.tipo);
            //setSemestre(res.data.semestre);
            //setTurma(res.data.turma);
            //setAtividade(res.data.atividade); 
          } catch (error) {
            setMessage("Erro ao conectar com o servidor. Tente novamente mais tarde.");
          }
        } else {
          setIsEditing(false);
        }
      };

      fetchQuestao();
    }, [params.id]);

    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setMessage("");
      try {
        const alternativas = [alternativaA, alternativaB, alternativaC, alternativaD, alternativaE];
        let res;

        if (isEditing) {
          res = await api.put('questaoProfessor', { id: params.id, alternativas, enunciado, justificativa, resposta, tema, isPublica, tipo, semestre, turma, atividade });
        } else {
          res = await api.post('questaoProfessor', { alternativas, enunciado, justificativa, resposta, tema, isPublica, tipo, semestre, turma, atividade });
        }

        if (res.status === 201) {
          setMessage("Questão cadastrada com sucesso!");
          navigate("/home-professor");
        } else {
          setMessage(res.data.message || "Falha ao realizar o cadastro. Tente novamente.");
        }
      } catch (error: any) {
        setMessage(error.response ? error.response.data : "Erro ao conectar com o servidor. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <>
        <NavBar />
        <div className="flex justify-center min-h-screen bg-gradient-to-b from-[#007BFF] to-[#0056B3]">
          <form onSubmit={handleSubmit} className="grid grid-rows-6 gap-4 w-9/12 mt-4">
            
            {/* Tema e Tipo */}
            <div className="flex grid-cols-2 row-span-1 gap-4 justify-between items-center">
              <div className="w-2/6">
                <label className="block text-black text-xl mb-2 font-bold" htmlFor="tema">Tema*:</label>
                <input
                  type="text"
                  id="tema"
                  className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={tema}
                  onChange={e => setTema(e.target.value)}
                  required
                />
              </div>
              
              <div className="w-1/6">
                <label className="block text-black text-xl font-bold mb-2" htmlFor="tipo">Tipo*:</label>
                <select
                  id="tipo"
                  className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={tipo}
                  onChange={e => setTipo(e.target.value)}
                  required
                >
                  <option value="Objetiva">Objetiva</option>
                  <option value="Subjetiva">Subjetiva</option>
                </select>
              </div>

              <div className="w-1/6">
                <label className="block text-black text-xl font-bold mb-2" htmlFor="isPublica">Visibilidade*:</label>
                <select
                  id="isPublica"
                  className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={isPublica}
                  onChange={e => setIsPublica(e.target.value)}
                  required
                >
                  <option value="true">Público</option>
                  <option value="false">Privado</option>
                </select>
              </div>
            </div>

            {/* Semestre, turma e atividade */}
            <div className="flex grid-cols-2 row-span-1 gap-4 justify-between items-center">
              <div className="w-2/6">
                <label className="block text-black text-xl mb-2 font-bold" htmlFor="semestre">Semestre:</label>
                <input
                  type="text"
                  id="semestre"
                  className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={semestre}
                  onChange={e => setSemestre(e.target.value)}
                />
              </div>
              
              <div className="w-2/6">
                <label className="block text-black text-xl mb-2 font-bold" htmlFor="turma">Turma:</label>
                <input
                  type="text"
                  id="turma"
                  className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={turma}
                  onChange={e => setTurma(e.target.value)}
                />
              </div>

              <div className="w-2/6">
                <label className="block text-black text-xl mb-2 font-bold" htmlFor="atividade">Atividade:</label>
                <input
                  type="text"
                  id="atividade"
                  className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={atividade}
                  onChange={e => setAtividade(e.target.value)}
                />
              </div>

            </div>

            {/* Enunciado e Justificativa */}
            <div className="row-span-1">
              <label className="block text-black text-xl font-bold mb-2" htmlFor="enunciado">Enunciado*:</label>
              <textarea
                id="enunciado"
                rows={4}
                className="w-full p-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={enunciado}
                onChange={e => setEnunciado(e.target.value)}
                required
              />
            </div>

            <div className="row-span-1">
              <label className="block text-black text-xl font-bold mb-2" htmlFor="justificativa">Justificativa da Resposta*:</label>
              <textarea
                id="justificativa"
                rows={4}
                className="w-full p-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={justificativa}
                onChange={e => setJustificativa(e.target.value)}
                required
              />
            </div>

            {/* Alternativas e Resposta */}
            {tipo === "Objetiva" && (
              <>
                {/* Alternativa A e B */}
                <div className="grid grid-cols-2 gap-10 row-span-1">
                  <div>
                    <label className="block text-black text-xl font-bold mb-2" htmlFor="altA">Alternativa A*:</label>
                    <textarea
                      id="altA"
                      className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      value={alternativaA}
                      onChange={e => setAltA(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-black text-xl font-bold mb-2" htmlFor="altB">Alternativa B*:</label>
                    <textarea
                      id="altB"
                      className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      value={alternativaB}
                      onChange={e => setAltB(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Alternativa C e D */}
                <div className="grid grid-cols-2 gap-10 row-span-1">
                  <div>
                    <label className="block text-black text-xl font-bold mb-2" htmlFor="altC">Alternativa C:</label>
                    <textarea
                      id="altC"
                      className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      value={alternativaC}
                      onChange={e => setAltC(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-black text-xl font-bold mb-2" htmlFor="altD">Alternativa D:</label>
                    <textarea
                      id="altD"
                      className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      value={alternativaD}
                      onChange={e => setAltD(e.target.value)}
                    />
                  </div>
                </div>

                {/* Alternativa E */}
                <div className="grid grid-cols-2 gap-10 row-span-1">
                  <div>
                    <label className="block text-black text-xl font-bold mb-2" htmlFor="altE">Alternativa E:</label>
                    <textarea
                      id="altE"
                      className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      value={alternativaE}
                      onChange={e => setAltE(e.target.value)}
                      />
                  </div>

                  {/* Resposta */}
                  <div className="w-1/2">
                    <label className="block text-black text-xl font-bold mb-2" htmlFor="resposta">Resposta Correta*:</label>
                    <select
                      id="resposta"
                      className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={resposta}
                      onChange={e => setResposta(e.target.value)}
                      required
                      >
                      <option value="A">Alternativa A</option>
                      <option value="B">Alternativa B</option>
                      {alternativaC && <option value="C">Alternativa C</option>}
                      {alternativaD && <option value="D">Alternativa D</option>}
                      {alternativaE && <option value="E">Alternativa E</option>}
                    </select>
                  </div>
                </div>
              </>
            )}

             {/* Cancelar e Submit */}
             <div className="flex justify-between mb-10">
                <div className='w-1/4 justify-end'>
                  <button className="bg-white text-black font-anonymous-pro font-bold p-5 border border-black rounded-lg text-xl hover:bg-gray-100 w-full"
                          onClick={() => navigate("/home-professor")}
                  >
                    CANCELAR
                  </button>
                </div>

                <div className='w-1/4 justify-end'>
                  <button type="submit" className="bg-white text-black font-anonymous-pro font-bold p-5 border border-black rounded-lg text-xl hover:bg-gray-100 w-full">
                    {isEditing ? "EDITAR" : "CADASTRAR"}
                  </button>
                </div>
              </div>
          </form>
        </div>
      </>
    );
};

export default CadastrarQuestao;
