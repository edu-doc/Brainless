import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { api } from "../utils/axios";

interface Questao {
    id: number;
    enunciado: string;
    tema: string[]; 
    ano: number; 
}


const HomeAluno = () => {

    const navigate = useNavigate();

    const [questoes, setQuestoes] = useState<Questao[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchQuestoes = async () => {
            try {
                const res = await api.get('/professor');
                console.log(res.data);
                setQuestoes(res.data);
            } catch (error) {
                console.error('Erro ao buscar questões:', error);
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
                <NavBar />
                <div className="bg-blue-500 flex flex-1 justify-around">
                    
                    {/* Menu Lateral */}
                    <div className=" w-2/12 m-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Menu</h2>
                        <ul>
                            <li className="mb-2"><a href="/item1">Suas Estatísticas</a></li>
                        {/* Adicione mais itens conforme necessário */}
                        </ul>
                    </div>

                    <div className="p-4 w-10/12"> {/* Ajuste ml-72 para a largura do menu e mt-16 para a altura da barra de navegação */}
                        <main className="flex-1 bg-white h-full rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-center mb-3">
                                <h1 className="text-2xl font-bold mb-4">Tabela de Dados</h1>
                                <button
                                    onClick={() => navigate("/cadastrar-questao")}
                                    className="flex w-2/12 justify-center rounded-md bg-[#0056B3] p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#007BFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Cadastrar Questão
                                </button>
                            </div>
                                
                            {/* Tabela */}
                            <div className="overflow-x-auto rounded-md">
                                <table className="table-auto w-full h-full rounded-md border-1 border-black hover:table-auto">
                                    <thead className="bg-[#0056B3] text-white border-solid border-1 border-black">
                                        <tr>
                                            <th className="px-4 py-2">Enunciado</th>
                                            <th className="px-4 py-2">Tema</th>
                                            <th className="px-4 py-2">Ano</th>
                                            <th className="px-4 py-2">Editar</th>
                                            <th className="px-4 py-2">Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {questoes.map((questao) => (
                                            <tr key={questao.id} className="border-b bg-gray-300">
                                                <td className="px-4 py-2">{questao.enunciado}</td>
                                                <td>{(questao.tema ?? []).join(', ')}</td> {/* Usando coalescência nula */}
                                                <td className="px-4 py-2">
                                                    <div className="flex justify-center">
                                                        {questao.ano}
                                                    </div></td>
                                                <td className="px-4 py-2">
                                                    <div className="flex justify-center">
                                                        <button className="p-2 bg-[#0056B3] w-8 h-8 text-white rounded-md flex items-center justify-center hover:bg-[#007BFF] ">
                                                            <img src="src/assets/icon-editar.png" alt="editar" className="w-full h-full filter invert drop-shadow-md"/>
                                                        </button> 
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 flex justify-center">
                                                    <div className="flex justify-center">
                                                        <button className="p-2 bg-red-600 w-8 h-8 drop-shadow-md text-white rounded-md flex items-center justify-center hover:bg-red-500">
                                                            <img src="src/assets/icon-excluir.png" alt="excluir" className="w-full h-full filter invert drop-shadow-md"/>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </main>
                    </div>
                </div>
                </div>
            </>

)};

export default HomeAluno;