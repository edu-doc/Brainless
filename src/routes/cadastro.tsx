import { useState } from 'react'
import { api } from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {

    const [ email, setEmail ] = useState("");
    const [ nome, setNome ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ cpf, setCpf ] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async() => { 
      const res = await api.post('cadastro', { email, nome , senha , cpf} )
      if(res.status == 200 ) {
        navigate("/home");
      }
    }
    
    return <div>
        <form action="">
            <input value={email} onChange={e => setEmail( e.target.value)} type="text" />
            <input value={nome} onChange={e => setNome( e.target.value)} type="text" />
            <input value={senha} onChange={e => setSenha( e.target.value)} type="text" />
            <input value={cpf} onChange={e => setCpf( e.target.value)} type="text" />
            <button onClick={() => handleSubmit()}>Cadastro</button>
            <button onClick={() => navigate("/")}>Voltar</button>
      </form>
    </div>

};

export default Cadastro;