import React, { useState } from 'react'
import { api } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import '../style/login.css'

const Login = () => {
    
    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async(e: React.FormEvent) => { 
    e.preventDefault();
      const res = await api.post('login', { email , senha } )
      if(res.status == 200 ) {
        navigate("/home");
      }
  
    }
    
   /* return (
      <div className='container'>
        <img src="src/assets/logo-brainless.png" alt="Logo" />
          <form action="">
            <input value={email} onChange={e => setEmail( e.target.value)} type="text" />
            <input value={senha} onChange={e => setSenha( e.target.value)} type="text" />
            <button onClick={handleSubmit}>Login</button>
            <button onClick={() => navigate("/cadastro")}>Cadastro</button>
          </form>
      </div>*/

      return (
        <>
        <div className='flex justify-center items-center h-screen bg-[#0056B3]'>
        <div className='w-96 p-2 shadow-lg bg-white rounded-md'>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="../src/assets/logo-brainless.png"
                className="mx-auto h-10 w-auto"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Senha
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-[#0056B3] hover:text-indigo-500">
                        Esqueceu a senha?
                      </a>
                    </div>
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
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex w-full justify-center rounded-md bg-[#0056B3] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#007BFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={() => navigate("/cadastro")}
                    className="flex w-full mt-4 justify-center rounded-md bg-[#0056B3] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#007BFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cadastra-se
                  </button>
                </div>
              </form>
            </div>
          </div>
          </div>
          </div>
        </>
      )
          
    //)

};

export default Login;