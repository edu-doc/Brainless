import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Login from './routes/login';
import Cadastro from './routes/cadastro';
import CadastrarQuestao from './routes/cadastrar-questao';
import HomeProfessor from './routes/home-professor';
import HomeAluno from './routes/home-aluno';
import ResponderQuestao from './routes/responder-questao';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/home-professor",
    element: <HomeProfessor />
  },
  {
    path: "/home-aluno",
    element: <HomeAluno />
  },
  {
    path: "/cadastrar-questao",
    element: <CadastrarQuestao />
  },
  {
    path: "/editar-questao/:id",
    element: <CadastrarQuestao />
  },
  {
    path: "/responder-questao/:id",
    element: <ResponderQuestao />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
