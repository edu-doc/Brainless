import { useEffect, useState } from 'react';
import { api } from '../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

import NavBar from "../components/NavBar";

const CadastrarQuestao = () => {

    const [ temas, setTema ] = useState("");
    const [ enunciado, setEnunciado ] = useState("");
    const [ justificativa, setJustificativa ] = useState("");
    const [ alternativaA, setAltA ] = useState("");
    const [ alternativaB, setAltB ] = useState("");
    const [ alternativaC, setAltC] = useState("");
    const [ alternativaD, setAltD] = useState("");
    const [ alternativaE, setAltE] = useState("");
    const [ isPublica, setIsPublica] = useState("true");
    const [ resposta, setResposta ] = useState("A");

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
              // Preencher os estados com os dados da questão
              setEnunciado(res.data.enunciado);
              setTema(res.data.tema[0]);
              setAltA(res.data.alternativas[0]);
              setAltB(res.data.alternativas[1]);
              setAltC(res.data.alternativas[2]);
              setAltD(res.data.alternativas[3]);
              setAltE(res.data.alternativas[4]);
              setIsPublica(res.data.isPublica);
              setResposta(res.data.resposta);
              setJustificativa(res.data.justificativa);
              // e assim por diante para outros campos
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

      console.log("ID da questão:", params.id);

      try {
        const alternativas = [alternativaA, alternativaB, alternativaC, alternativaD, alternativaE];
        const tema = [temas];

        let res;

        if(isEditing){
          res = await api.put('questaoProfessor' , { id: params.id ,alternativas, enunciado, justificativa, resposta , tema, isPublica });
        } else {
          res = await api.post('questaoProfessor' , { alternativas, enunciado, justificativa, resposta, tema, isPublica });
        }
    
        if (res.status === 201) {
          setMessage("Questão cadastrada com sucesso!");
          navigate("/home-professor");
        } else {
          setMessage(res.data.message || "Falha ao realizar o cadastro. Tente novamente.");
        }
      } catch (error: any) {
        if (error.response) { 
          setMessage(error.response.data || "Erro ao processar a requisição.");
        } else if (error.request) {
          setMessage("Sem resposta do servidor. Verifique sua conexão e tente novamente.");
        } else {
          setMessage("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        }
      } finally {
        setLoading(false); // Garante que o loading é desativado após a requisição
      }
    
    };

    return (
      <>
        <NavBar />
          <div className="flex justify-center min-h-screen bg-gradient-to-b from-[#007BFF] to-[#0056B3] ">
            <form onSubmit={handleSubmit} className="grid grid-rows-6 gap-4 w-9/12 mt-4">

              {/* Tema e visibilidade*/}
              <div className="flex grid-cols-2 row-span-1 gap-4 justify-between items-center">
                <div className='w-2/6'>
                  <label className="block text-black text-xl mb-2 font-bold" htmlFor="tema">
                    Tema*:
                  </label>
                  <input
                    type="text"
                    id="tema"
                    name="tema"
                    className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={temas || ''}
                    onChange={e => setTema(e.target.value)}
                    required
                    />
                </div>
                <div className='w-1/6'>
                    <label className="block text-black text-xl font-bold mb-2" htmlFor="isPublica">
                      Visibilidade*:
                    </label>
                    <select
                      id="isPublica"
                      name="isPublica"
                      className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={isPublica || ''}
                      onChange={e => setIsPublica(e.target.value)}
                      required
                      >
                      <option value="true">Público</option>
                      <option value="false">Privado</option>
                    </select>
                </div>
              </div>

              {/* Enunciado */}
              <div className="row-span-1">
                <label className="block text-black text-xl font-bold mb-2" htmlFor="enunciado">
                  Enunciado*:
                </label>
                <textarea
                  id="enunciado"
                  name="enunciado"
                  rows={4}
                  className="w-full p-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={enunciado}
                  onChange={e => setEnunciado(e.target.value)}
                  required
                />
              </div>
              <div className="row-span-1">
                <label className="block text-black text-xl font-bold mb-2" htmlFor="enunciado">
                  Justificativa da Resposta*:
                </label>
                <textarea
                  id="justificativa"
                  name="justificativa"
                  rows={4}
                  className="w-full p-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={justificativa}
                  onChange={e => setJustificativa(e.target.value)}
                  required
                />
              </div>

              {/* Alternativa A e B */}
              <div className="grid grid-cols-2 gap-10 row-span-1">
                <div>
                  <label className="block text-black text-xl font-bold mb-2" htmlFor="altA">
                    Alternativa A*:
                  </label>
                  <textarea
                    id="altA"
                    name="altA"
                    className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={alternativaA}
                    onChange={e => setAltA(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-black text-xl font-bold mb-2" htmlFor="altB">
                    Alternativa B*:
                  </label>
                  <textarea
                    id="altB"
                    name="altB"
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
                  <label className="block text-black text-xl font-bold mb-2" htmlFor="altC">
                    Alternativa C:
                  </label>
                  <textarea
                    id="altC"
                    name="altC"
                    className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={alternativaC}
                    onChange={e => setAltC(e.target.value)}
                    
                  />
                </div>
                <div>
                  <label className="block text-black text-xl font-bold mb-2" htmlFor="altD">
                    Alternativa D:
                  </label>
                  <textarea
                    id="altD"
                    name="altD"
                    className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={alternativaD}
                    onChange={e => setAltD(e.target.value)}
                    
                  />
                </div>
              </div>

              {/* Alternativa E e Select de Resposta */}
              <div className="flex justify-between gap-10">
                <div className='w-1/2'>
                  <label className="block text-black text-xl font-bold mb-2" htmlFor="altE">
                    Alternativa E:
                  </label>
                  <textarea
                    id="altE"
                    name="altE"
                    className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={alternativaE}
                    onChange={e => setAltE(e.target.value)}
                  />
                </div>

                <div className='w-1/2'>
                  <label className="block text-black text-xl font-bold mb-2" htmlFor="resposta">
                    Resposta*:
                  </label>
                  <select
                    id="resposta"
                    name="resposta"
                    className="w-1/6 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ml-auto resize-none" 
                    value={resposta}
                    onChange={e => setResposta(e.target.value)}
                    required
                    >
                      {alternativaA && <option value="A">A</option>}
                      {alternativaB && <option value="B">B</option>}
                      {alternativaC && <option value="C">C</option>}
                      {alternativaD && <option value="D">D</option>}
                      {alternativaE && <option value="E">E</option>}
                  </select>
                </div>
              </div>

               {/* Cancelar e Submit */}
               <div className="flex justify-between">
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