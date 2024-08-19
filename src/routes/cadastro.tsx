import { useState } from 'react'
import { api } from '../utils/axios';
import { useNavigate } from 'react-router-dom';


const Cadastro = () => {

    const [ email, setEmail ] = useState("");
    const [ nome, setNome ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ cpf, setCpf ] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async(e: React.FormEvent) => { 
      e.preventDefault();
      const res = await api.post('cadastro', { email, nome , senha , cpf} )
      console.log(res.data);
      console.log(res.status)
      if(res.status == 201 ) {
        navigate("/");
      }
    }
    
    return <div>
        <form onSubmit={handleSubmit} >
          <div>
            <label>Email:</label>
            <input name='Email' value={email} onChange={e => setEmail( e.target.value)} type="text" placeholder="Digite seu email" />
          </div>
          <div>
            <label>Nome:</label>
            <input name='Nome' value={nome} onChange={e => setNome( e.target.value)} type="text" placeholder="Digite seu nome" />
          </div>
          <div>
            <label>Senha:</label>
            <input name='Senha' value={senha} onChange={e => setSenha( e.target.value)} type="password" placeholder="Digite sua senha" />
          </div>
          <div>
            <label>CPF:</label>
            <input name='CPF' value={cpf} onChange={e => setCpf( e.target.value)} type="text" placeholder="Digite seu CPF" />
          </div>
            <button type="submit">Cadastro</button>
            <button onClick={() => navigate("/")}>Voltar</button>
      </form>
    </div>

};

export default Cadastro;