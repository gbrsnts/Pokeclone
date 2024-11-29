import './Cards.css';
import PokemonCard from './PokemonCard';

function Cards({ result }) {
    return (
        <>
        <h2 className="titulo-pokemon">Pokémons encontrados {result.total}</h2>
        <table className="tabela-pokemon">
            <thead>
                <tr>
                    <th>Pokémon</th>
                    <th>Nome</th>
                    <th>Tipo 1</th>
                    <th>Tipo 2</th>
                    <th>Habitat</th>
                    <th>Cor</th>
                    <th>Fase de evolução</th>
                    <th>Altura</th>
                    <th>Peso</th>
                </tr>
            </thead>
            <tbody>
                {result.pokemons.map((pokemon, index) => (
                    <PokemonCard key={index} pokemon={pokemon} />
                ))}
            </tbody>
        </table>

        </>
    );
}

export default Cards;
