import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios';
import './Sugestao.css';

const BASE_URL = import.meta.env.VITE_API_URL

function Sugestao() {
    const [nome, setNome] = useState('')
    const [matricula, setMatricula] = useState('')
    const [sugestao, setSugestao] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!nome || !sugestao) return
        const data = { nome, matricula, sugestao }

        try {
            const response = await axios.post(`${BASE_URL}/api/pokemon/sugestao`, data, {
                headers: {
                    'Content-type': 'application/json'
                },
            })

            if (response.status >= 200 && response.status < 300) {
                alert("Sugestão enviada com sucesso!")
                setNome('')
                setMatricula('')
                setSugestao('')
            } else {
                alert("Erro ao enviar sugestão.");
            }
            
        } catch (error) {
            console.error("Erro ao enviar a sugestão:", error);
            alert("Erro ao enviar sugestão.");
        }
    }

    return (
        <div id="sugestao-app">
            <Helmet>
                <title>Pokeclone - Sugestões</title>
            </Helmet>
            <div className="container-sugestao">
                <h2 className="titulo-pokemon">Sugestões</h2>  
                <p>Nos ajude a melhorar sua experiência!</p>
                <div className="formulario-sugestao">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nome">Nome: <span className="asterisco">*</span></label>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Seu nome aqui"
                            required
                        />
                        <label htmlFor="matricula">Matrícula:</label>
                        <input
                            type="text"
                            id="matricula"
                            value={matricula}
                            placeholder="Seu número de matrícula aqui"
                            onChange={(e) => setMatricula(e.target.value)}
                        />
                        <label htmlFor="sugestao">Sugestão: <span className="asterisco">*</span></label>
                        <textarea
                            id="sugestao"
                            value={sugestao}
                            onChange={(e) => setSugestao(e.target.value)}
                            placeholder="Sua sugestão aqui"
                            required
                        />
                        <button onClick={() => navigate('/')}>
                        Voltar
                        </button>
                        <button type="submit">Enviar sugestão</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sugestao