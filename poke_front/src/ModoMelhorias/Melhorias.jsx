import './Melhorias.css'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

function Melhorias() {
    const navigate = useNavigate()

    return (
        <div id="melhorias-app">
            <Helmet>
                <title>Pokeclone - Melhorias</title>
            </Helmet>
            <div className="container-melhorias">
            <h2 className="titulo-pokemon">Melhorias já mapeadas:</h2>
                <ul className="">
                    <li>Responsividade em geral</li>
                    <li>Estruturação do projeto (pastas)</li>
                    <li>Pokémon ser submetido pelo click</li>
                    <li>Estilização dos pokémons encontrados</li>
                    <li>Permitir transição de modo enquanto está em outro</li>
                    <li>Opção de voltar após entrar em algum modo</li>
                    <li>Implementar chance de acerto em %?</li>
                </ul>
                <button className="botao-voltar" onClick={() => navigate('/')}>
                    Voltar
                </button>
            </div>
        </div>
    )
}

export default Melhorias