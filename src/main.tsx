import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Login from './routes/login';
import Cadastro from './routes/cadastro';
import Home from './routes/home';
import CadastrarQuestao from './routes/cadastrar-questao';

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
    path: "/home",
    element: <Home />
  },
  {
    path: "/cadastrar-questao",
    element: <CadastrarQuestao />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
