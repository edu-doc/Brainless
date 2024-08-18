import React, { useState } from 'react'
import { api } from '../utils/axios';
import { useNavigate } from 'react-router-dom';

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
    
    return <div>
        <form action="">
            <input value={email} onChange={e => setEmail( e.target.value)} type="text" />
            <input value={senha} onChange={e => setSenha( e.target.value)} type="text" />
            <button onClick={handleSubmit}>Login</button>
            <button onClick={() => navigate("/cadastro")}>Cadastro</button>
        </form>
    </div>

};

export default Login;