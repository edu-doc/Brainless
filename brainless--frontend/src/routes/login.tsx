import React, { useState, useEffect } from "react";
import { api } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../style/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { userId, setUserId } = useAuth();

  const isFormValid = () => email.trim() !== "" && senha.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Limpa a mensagem anterior

    try {
      const res = await api.post("login", { email, senha });
      if (res.status === 200) {
        console.log(JSON.stringify(res, null, 2));
        const user = res.data;
        setUserId(user.id);
        console.log("userId: " + userId);
        localStorage.setItem("user", JSON.stringify(user)); // <-- isso aqui é importante. guarda o usuario logado no storage, entao sempre que for verificar se é aluno/prof é só pegar de la

        console.log("ID do usuario:", user.id);
        if (user.isProfessor) {
          navigate("/home-professor");
        } else {
          navigate("/home-aluno");
        }
      } else {
        setMessage("Falha ao realizar o login. Tente novamente.");
      }
    } catch (error: any) {
      if (error.response) {
        setMessage("Falha ao realizar o login. Tente novamente.");
      } else if (error.request) {
        setMessage(
          "Sem resposta do servidor. Verifique sua conexão e tente novamente."
        );
      } else {
        setMessage(
          "Erro ao conectar com o servidor. Tente novamente mais tarde."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      console.log("User ID from AuthContext:", userId);
    }
  }, [userId]);

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#007BFF] from-41% to-[#0056B3] to-90%">
        <div className="w-96 p-2 shadow-lg bg-white rounded-md">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Brainless Logo"
                src="../src/assets/logo-brainless-nome.png"
                className="mx-auto h-20 w-auto"
              />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
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
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={!isFormValid() || loading}
                    className={`flex w-full justify-center rounded-md px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm ${
                      isFormValid()
                        ? "bg-[#0056B3] hover:bg-[#007BFF]"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Carregando..." : "Entrar"}
                  </button>
                  {message && (
                    <div className="mt-4 p-3 border border-red-600 bg-red-100 text-red-600 rounded-md">
                      <p>{message}</p>
                    </div>
                  )}
                  <hr className="mt-4" />
                  <button
                    onClick={() => navigate("/cadastro")}
                    className="flex w-full mt-4 justify-center rounded-md bg-[#0056B3] px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#007BFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Criar Conta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
