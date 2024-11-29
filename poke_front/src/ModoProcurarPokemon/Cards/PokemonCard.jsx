function PokemonCard({ pokemon }) {
    const heightformatada = pokemon.height <= 99 
    ? `${pokemon.height}cm` 
    : `${(pokemon.height / 100).toFixed(2).replace('.', 'm').replace('00', '')}`;

    const weightformatada = (pokemon.weight % 1 === 0) 
        ? `${Number(pokemon.weight).toFixed(0)}kg` 
        : `${Number(pokemon.weight).toFixed(1)}kg`;

    return (
        <tr>
            <td>
                <img src={pokemon.url_sprite} alt={pokemon.name} className="pokemon-sprite" />
            </td>
            <td>{pokemon.name}</td>
            <td>{pokemon.type1}</td>
            <td>{pokemon.type2}</td>
            <td>{pokemon.habitat}</td>
            <td>{pokemon.color}</td>
            <td>{pokemon.stage}</td>
            <td>{heightformatada}</td>
            <td>{weightformatada}</td>
        </tr>
    );
}

export default PokemonCard;