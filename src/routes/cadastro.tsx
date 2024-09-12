import { useState } from 'react';
import { api } from '../utils/axios';
import { useNavigate } from 'react-router-dom';


const Cadastro = () => {

    const [ email, setEmail ] = useState("");
    const [ nome, setNome ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ cpf, setCpf ] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
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
    <div className='flex justify-center items-center h-screen bg-gradient-to-b from-[#007BFF] from-41% to-[#0056B3] to-90%'>
    <div className='w-96 p-2 shadow-lg bg-white rounded-md'>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Brainless Logo"
            src="../src/assets/logo-brainless-nome.png"
            className="mx-auto h-20 w-auto"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-3 ">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={email} onChange={e => setEmail( e.target.value)} 
                />
              </div>
            </div>

            <div>
              <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
                Nome
              </label>
              <div className="mt-2">
                <input
                  id="nome"
                  name="nome"
                  type="nome"
                  required
                  autoComplete="nome"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={nome} onChange={e => setNome( e.target.value)} 
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Senha
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={senha} onChange={e => setSenha( e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="cpf" className="block text-sm font-medium leading-6 text-gray-900">
                CPF
              </label>
              <div className="mt-2">
                <input
                  id="cpf"
                  name="cpf"
                  type="cpf"
                  required
                  autoComplete="cpf"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={cpf} onChange={e => setCpf( e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="flex w-full mt-4 justify-center rounded-md bg-[#0056B3] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#007BFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
              {message && (
                <div className="flex items-center justify-center p-3 mt-4 border border-red-600 bg-red-100 text-red-600 rounded-md shadow-md">
                  <p className="text-sm">{message}</p>
                </div>
              )}              
              <hr className='mt-4' />
              <button
                onClick={() => navigate("/")}
                className="flex w-full mt-4 justify-center rounded-md bg-[#0056B3] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#007BFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Voltar
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      </div>
    </>
  )

};

export default Cadastro;