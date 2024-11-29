import { useState, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import './FormularioClassico.css'
import { Dropdown } from 'primereact/dropdown'

function FormularioClassico({ setVitoria, pokemonSorteado, setResult, lista, setLista }) {
    const [tentativa, setTentativa] = useState('')
    const fetchPokemon = useFetch()

    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }

        const tentativaCapitalizada = capitalizeFirstLetter(tentativa.toLowerCase())

        if (!tentativa || !Object.values(lista).some(pokemon => pokemon.name === tentativaCapitalizada)) return;

        try {
            const pokemon = await fetchPokemon(`/name/${tentativaCapitalizada}`)

            if (pokemon && tentativaCapitalizada === pokemonSorteado) {
                setVitoria(true);
            }

            setResult((prevResult) => ({
                total: prevResult ? prevResult.total + 1 : 1,
                pokemons: prevResult ? [pokemon, ...prevResult.pokemons] : [pokemon],
            }))

            setLista((prevLista) => {
                const novaLista = { ...prevLista }
                const chaveParaRemover = Object.keys(novaLista).find(key => novaLista[key].name === tentativaCapitalizada)
                // Se a chave for encontrada, remove-a
                if (chaveParaRemover) {
                    delete novaLista[chaveParaRemover]
                }
                return novaLista
            })

        } catch (error) {
            console.error("Erro ao buscar Pokémon", error)
        }

        setTentativa('')
    }

    const filteredOptions = tentativa
    ? Object.values(lista).filter(option => 
        option.name.toLowerCase().startsWith(tentativa.toLowerCase())
    )
    : [];


    function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

    return (
        <div id="app">
            <form onSubmit={handleSubmit}>
                <div className="formulario">
                            <input
                                type="text"
                                placeholder="Escreva o nome do seu pokémon"
                                value={tentativa}
                                onChange={(e) => setTentativa(e.target.value)}
                                autoComplete="new-password"
                                tabIndex="0"
                                className="input p-dropdown-panel"
                            />
                    {filteredOptions.length > 0 && !Object.values(lista).map(pokemon => pokemon.name).includes(tentativa) &&  (
                        <ul className="opcoes-dropdown">
                            {filteredOptions.map(option => (
                                <li
                                    key={option.name} 
                                    onClick={() => setTentativa(option.name)}
                                >
                                    <img src={option.url_sprite} className='option-sprite'/>
                                    {option.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    <button type="submit" className="submit-button">➤</button>
                </div>
            </form>
        </div>
    );
}

export default FormularioClassico;
