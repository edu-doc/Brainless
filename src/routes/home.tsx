import NavBar from "../components/NavBar";

const Home = () => {
    
    return (
            <>
                <div className="w-full h-full">
                <NavBar />
                <div className="bg-blue-500 w-full h-full flex justify-start">
                    
                    {/* Menu Lateral */}
                    <div className="w-2/12 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Menu</h2>
                        <ul>
                            <li className="mb-2"><a href="/item1">Suas Estatísticas</a></li>
                        {/* Adicione mais itens conforme necessário */}
                        </ul>
                    </div>

                    <div className="w-full h-full p-4"> {/* Ajuste ml-72 para a largura do menu e mt-16 para a altura da barra de navegação */}
                        <main className="flex-1 bg-white rounded-lg shadow-lg p-6">
                            <h1 className="text-2xl font-bold mb-4">Tabela de Dados</h1>
                                
                            {/* Tabela */}
                            <div className="overflow-x-auto rounded-md">
                                <table className="table-auto w-full rounded-md border-1 border-black hover:table-auto">
                                    <thead className="bg-blue-500 border-solid border-1 border-black">
                                        <tr>
                                            <th className="px-4 py-2">Enunciado</th>
                                            <th className="px-4 py-2">Tema</th>
                                            <th className="px-4 py-2">Status</th>
                                            <th className="px-4 py-2">Editar</th>
                                            <th className="px-4 py-2">Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b bg-gray-300">
                                            <td className="px-4 py-2">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                            <td className="px-4 py-2">Malcolm Lockyer</td>
                                            <td className="px-4 py-2">1961</td>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-center">
                                                    <button className="p-2 bg-blue-500 w-8 h-8 text-white rounded-md flex items-center justify-center hover:bg-blue-600 ">
                                                        <img src="src/assets/icon-editar.png" alt="editar" className="w-full h-full filter invert drop-shadow-md"/>
                                                    </button> 
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 flex justify-center">
                                                <div className="flex justify-center">
                                                    <button className="p-2 bg-red-500 w-8 h-8 drop-shadow-md text-white rounded-md flex items-center justify-center hover:bg-red-600">
                                                        <img src="src/assets/icon-excluir.png" alt="excluir" className="w-full h-full filter invert drop-shadow-md"/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b bg-gray-300">
                                            <td className="px-4 py-2">Witchy Woman</td>
                                            <td className="px-4 py-2">The Eagles</td>
                                            <td className="px-4 py-2">1972</td>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-center">
                                                    <button className="p-2 bg-blue-500 w-8 h-8 text-white rounded-md flex items-center justify-center hover:bg-blue-600 ">
                                                        <img src="src/assets/icon-editar.png" alt="editar" className="w-full h-full filter invert drop-shadow-md"/>
                                                    </button> 
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 flex justify-center">
                                                <div className="flex justify-center">
                                                    <button className="p-2 bg-red-500 w-8 h-8 drop-shadow-md text-white rounded-md flex items-center justify-center hover:bg-red-600">
                                                        <img src="src/assets/icon-excluir.png" alt="excluir" className="w-full h-full filter invert drop-shadow-md"/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b bg-gray-300">
                                            <td className="px-4 py-2">Shining Star</td>
                                            <td className="px-4 py-2">Earth, Wind, and Fire</td>
                                            <td className="px-4 py-2">1975</td>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-center">
                                                    <button className="p-2 bg-blue-500 w-8 h-8 text-white rounded-md flex items-center justify-center hover:bg-blue-600 ">
                                                        <img src="src/assets/icon-editar.png" alt="editar" className="w-full h-full filter invert drop-shadow-md"/>
                                                    </button> 
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 flex justify-center">
                                                <div className="flex justify-center">
                                                    <button className="p-2 bg-red-500 w-8 h-8 drop-shadow-md text-white rounded-md flex items-center justify-center hover:bg-red-600">
                                                        <img src="src/assets/icon-excluir.png" alt="excluir" className="w-full h-full filter invert drop-shadow-md"/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </main>
                    </div>
                </div>
                </div>
            </>

)};

export default Home;