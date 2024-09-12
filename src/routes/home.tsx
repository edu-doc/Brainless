import NavBar from "../components/NavBar";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";


const Home = () => {
    
    return <div>
                <NavBar />
                <div className="bg-blue-500 min-h-screen p-8">
                        {/* Menu Lateral */}
                        <div className="absolute top-40 bottom-4 left-4 w-64 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Menu</h2>
                            <ul>
                                <li className="mb-2"><a href="/item1">Suas Estatísticas</a></li>
                            {/* Adicione mais itens conforme necessário */}
                            </ul>
                        </div>

                    <div className="ml-72 p-4 flex flex-col min-h-screen"> {/* Ajuste ml-72 para a largura do menu e mt-16 para a altura da barra de navegação */}
                        <main className="flex-1 bg-white rounded-lg shadow-lg p-6">
                            <h1 className="text-2xl font-bold mb-4">Tabela de Dados</h1>
                                
                            {/* Tabela */}
                            <div className="overflow-x-auto">
                                <Table hoverable >
                                    <TableHead>
                                    <TableHeadCell>Enunciado</TableHeadCell>
                                    <TableHeadCell>Tema</TableHeadCell>
                                    <TableHeadCell>Status</TableHeadCell>
                                    <TableHeadCell>Ações</TableHeadCell>
                                    </TableHead>
                                    <TableBody className="divide-y">
                                    <TableRow className="bg-white dark:border-gray-700 dark:bg-white">
                                        <TableCell className="justify-center whitespace-nowrap font-medium text-black dark:text-black">
                                        {'Um carro anda a 80km..."'}
                                        </TableCell>
                                        <TableCell>Física </TableCell>
                                        <TableCell>Público</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-10 justify-center">
                                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                    Editar
                                                </a>
                                                <a href="#" className="mx-4 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                    Excluir
                                                </a>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="bg-white dark:border-gray-700 dark:bg-white">
                                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">
                                        Um experimento foi re...                                        </TableCell>
                                        <TableCell>Química</TableCell>
                                        <TableCell>Privado</TableCell>
                                        <TableCell>
                                        <div className="flex space-x-10 justify-center">
                                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                    Editar
                                                </a>
                                                <a href="#" className="mx-4 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                    Excluir
                                                </a>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="bg-white dark:border-gray-700 dark:bg-white">
                                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-black">Qual linguagem é usad...</TableCell>
                                        <TableCell className="">Programação </TableCell>
                                        <TableCell>Privado</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-10 justify-center">
                                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                    Editar
                                                </a>
                                                <a href="#" className="mx-4 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                                    Excluir
                                                </a>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </main>
                    </div>
                </div>
            </div>

};

export default Home;