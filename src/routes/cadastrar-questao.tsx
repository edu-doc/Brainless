import { useState } from 'react';
import { api } from '../utils/axios';
import { useNavigate } from 'react-router-dom';

import NavBar from "../components/NavBar";
import { Navbar } from 'flowbite-react';


const CadastrarQuestao = () => {

    const [ tema, setTema ] = useState("");
    const [ enunciado, setEnunciado ] = useState("");
    const [ alternativaA, setAltA ] = useState("");
    const [ alternativaB, setAltB ] = useState("");
    const [ alternativaC, setAltC] = useState("");
    const [ alternativaD, setAltD] = useState("");
    const [ alternativaE, setAltE] = useState("");
    const [ visibilidade, setVisibilidade] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async(e: React.FormEvent) => { 
      e.preventDefault();
      setLoading(true);
      setMessage("");

      try {
        const res = await api.post('cadastro', { email, nome, senha, cpf });
    
        if (res.status === 201) {
          setMessage("Cadastro realizado com sucesso!");
          navigate("/");
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
          <div className="flex justify-center min-h-screen bg-blue-500">
            <form onSubmit={handleSubmit} className="grid grid-rows-6 gap-4 w-9/12 mt-4">
    
              {/* Tema e visibilidade*/}
              <div className="grid grid-cols-2 row-span-1 justify-between items-center">

              <div>
                <label className="block text-black text-xl font-medium mb-2" htmlFor="tema">
                  Tema:
                </label>
                <input
                  type="text"
                  id="tema"
                  name="tema"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={tema}
                  onChange={e => setTema(e.target.value)}
                  required
                  />
            </div>

              <div className="mb-4">
                <label className="block text-black text-xl font-medium mb-2" htmlFor="visibilidade">
                  Visibilidade:
                </label>
                <select
                  id="visibilidade"
                  name="visibilidade"
                  className="w-9/12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={visibilidade}
                  onChange={e => setVisibilidade(e.target.value)}
                  required
                  >
                  <option value="publico">Público</option>
                  <option value="privado">Privado</option>
                </select>
                  </div>

                    </div>
    {/* Enunciado */}
    <div className="row-span-1">
      <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="enunciado">
        Enunciado:
      </label>
      <input
        type="text"
        id="enunciado"
        name="enunciado"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={enunciado}
        onChange={e => setEnunciado(e.target.value)}
        required
      />
    </div>

    {/* Alternativa A e B */}
    <div className="grid grid-cols-2 gap-4 row-span-1">
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="altA">
          Alternativa A:
        </label>
        <input
          type="text"
          id="altA"
          name="altA"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={alternativaA}
          onChange={e => setAltA(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="altB">
          Alternativa B:
        </label>
        <input
          type="text"
          id="altB"
          name="altB"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={alternativaB}
          onChange={e => setAltB(e.target.value)}
          required
        />
      </div>
    </div>

    {/* Alternativa C e D */}
    <div className="grid grid-cols-2 gap-4 row-span-1">
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="altC">
          Alternativa C:
        </label>
        <input
          type="text"
          id="altC"
          name="altC"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={alternativaC}
          onChange={e => setAltC(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="altD">
          Alternativa D:
        </label>
        <input
          type="text"
          id="altD"
          name="altD"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={alternativaD}
          onChange={e => setAltD(e.target.value)}
        />
      </div>
    </div>

    {/* Alternativa E */}
    <div className="row-span-1">
      <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="altE">
        Alternativa E:
      </label>
      <input
        type="text"
        id="altE"
        name="altE"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={alternativaE}
        onChange={e => setAltE(e.target.value)}
      />
    </div>

    {/* Submit button */}
    <button
      type="submit"
      className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600"
    >
      Enviar
    </button>
  </form>
</div>

      </>
    );

};

export default CadastrarQuestao;