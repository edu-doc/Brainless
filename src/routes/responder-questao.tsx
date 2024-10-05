import { useEffect, useState } from 'react';
import { api } from '../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';

import NavBar from "../components/NavBar";

const ResponderQuestao = () => {

    const [ temas, setTema ] = useState("");
    const [ enunciado, setEnunciado ] = useState("");
    const [ alternativaA, setAltA ] = useState("");
    const [ alternativaB, setAltB ] = useState("");
    const [ alternativaC, setAltC ] = useState("");
    const [ alternativaD, setAltD ] = useState("");
    const [ alternativaE, setAltE ] = useState("");
    const [ resposta, setResposta ] = useState("");
    const [ alternativaSelecionada, setAlternativaSelecionada ] = useState("");
    const [ submitted, setSubmitted ] = useState(false);
    const [ justificativa, setJustificativa ] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    
    const params = useParams<Record<string, string | undefined>>();

    useEffect(() => {
      const fetchQuestao = async () => {
        if (params.id) {
            try {
              const res = await api.get(`questao?id=${params.id}`);
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
              setMessage("Erro ao conectar com o servidor. Tente novamente mais tarde.");
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

    const getClassName = (alternativa: string) => {
        console.log("Resposta:" + resposta)
        console.log("Alternativa selecionada:" + alternativa)
        if (submitted) {
            if (alternativa === resposta) {
                return 'bg-[#5FAA00]';  // Pinta de verde
            } else if (alternativa === alternativaSelecionada) {
                return 'bg-[#9F4040]'; // Pinta de vermelho
            }
            return '';
        }

        if (alternativa === alternativaSelecionada) {
            return 'bg-[#B1B1B1]'; // Pinta de cinza
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
                    Tema:
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
                
              </div>

              {/* Enunciado */}
              <div className="row-span-1">
                <label className="block text-black text-xl font-bold mb-2" htmlFor="enunciado">
                  Enunciado:
                </label>
                <textarea
                  id="enunciado"
                  name="enunciado"
                  rows={4}
                  className="w-full p-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value = {enunciado}
                  readOnly
                />
              </div>

              {/* Alternativa A e B */}
              <div className="grid grid-cols-2 gap-10 row-span-1">
                <div>
                  <label className="block text-black text-xl font-bold mb-2" htmlFor="altA">
                    Alternativa A:
                  </label>
                  <textarea
                    id="A"
                    name="A"
                    value={alternativaA}
                    className={`w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none cursor-pointer ${getClassName("A")}`}
                    onChange={e => setAltA(e.target.value)}
                    onClick={() => setAlternativaSelecionada('A')}
                    disabled={submitted}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-black text-xl font-bold mb-2" htmlFor="altB">
                    Alternativa B:
                  </label>
                  <textarea
                    id="B"
                    name="B"
                    value={alternativaB}
                    className={`w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none cursor-pointer ${getClassName('B')}`}
                    onClick={() => setAlternativaSelecionada('B')} // Seleciona a alternativa ao clicar
                    disabled={submitted}
                    readOnly
                  />
                </div>
              </div>

              {/* Alternativa C e D */}
              
              {/* Alternativa C e D */}
              {alternativaC && (
                <div className="grid grid-cols-2 gap-10 row-span-1">
                  <div>
                    <label className="block text-black text-xl font-bold mb-2" htmlFor="altC">
                      Alternativa C:
                    </label>
                    <textarea
                      id="C"
                      name="C"
                      value={alternativaC}
                      className={`w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none cursor-pointer ${getClassName('C')}`}
                      onChange={e => setAltC(e.target.value)}
                      onClick={() => setAlternativaSelecionada('C')}
                      disabled={submitted}
                      readOnly
                    />
                  </div>
                </div>
              )}

              {alternativaD && (
                <div className="grid grid-cols-2 gap-10 row-span-1">
                  <div>
                    <label className="block text-black text-xl font-bold mb-2" htmlFor="altD">
                      Alternativa D:
                    </label>
                    <textarea
                      id="D"
                      name="D"
                      value={alternativaD}
                      className={`w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none cursor-pointer ${getClassName('D')}`}
                      onChange={e => setAltD(e.target.value)}
                      onClick={() => setAlternativaSelecionada('D')}
                      disabled={submitted}
                      readOnly
                    />
                  </div>
                </div>
              )}


              {/* Alternativa E*/}
              {alternativaE && (
              <div className="flex justify-between gap-10">
                <div className='w-1/2'>
                  <label className="block text-black text-xl font-bold mb-2" htmlFor="altE">
                    Alternativa E:
                  </label>
                  <textarea
                    id="E"
                    name="E"
                    value={alternativaE}
                    className={`w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none cursor-pointer ${getClassName('E')} ${submitted ? 'disabled' : ''}`}
                    onChange={e => setAltE(e.target.value)}
                    onClick={() => setAlternativaSelecionada('E')}
                    disabled={submitted}
                    readOnly
                  />
                </div>
              </div>
              )}

               {/* Cancelar e Responder */}
               <div className="flex justify-between">
                <div className='w-1/4 justify-end'>
                  <button className="bg-white text-black font-anonymous-pro font-bold p-5 border border-black rounded-lg text-xl hover:bg-gray-100 w-full"
                          onClick={() => navigate("/home-aluno")}
                  >
                    CANCELAR
                  </button>
                </div>

                <div className='w-1/4 justify-end'>
                  <button
                    type="submit" 
                    className="bg-white text-black font-anonymous-pro font-bold p-5 border border-black rounded-lg text-xl hover:bg-gray-100 w-full"
                    onClick={handleSubmit}
                  >
                    {submitted ? 'JUSTIFICATIVA' : 'RESPONDER'}
                  </button>
                </div>

                {/* Modal para mostrar justificativa */}
                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg">
                      <h2 className="text-xl font-bold mb-4">Justificativa</h2>
                      <p>{justificativa}</p>
                      <button
                        className="mt-4 bg-blue-500 text-white p-2 rounded"
                        onClick={() => setShowModal(false)}  // Fecha o modal
                      >
                        Fechar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </>
    );

};

export default ResponderQuestao;