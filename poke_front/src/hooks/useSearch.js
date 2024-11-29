import { useState } from 'react'

const useSearch = (base, params) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const filtrarPokemons = (pokemons, params) => {
        return pokemons.filter((pokemon) => {
            const habitatsFiltrados = params.habitat.split(',').includes(pokemon.habitat)
            const coresFiltradas = params.color.split(',').includes(pokemon.color)
            const novosStages = typeof params.stage === 'string' ? params.stage.split(",").map(Number) : [params.stage]
            const stagesFiltrados = novosStages.includes(pokemon.stage)
            const type2Filtrados =  params.type2.split(",").includes(pokemon.type2)
            const type1Filtrados =  params.type1.split(",").includes(pokemon.type1)
            const alturaFiltrada =  pokemon.height >= params.minHeight && pokemon.height <= params.maxHeight
            const pesoFiltrado = pokemon.weight >= params.minWeight && pokemon.weight <= params.maxWeight

            return coresFiltradas && habitatsFiltrados && stagesFiltrados && type1Filtrados && type2Filtrados && alturaFiltrada && pesoFiltrado
        })
    }
    
    const fetchData = async () => {
        try {
            const response = filtrarPokemons(base.pokemons, params)
            const data = {
                total: response.length,
                pokemons: response
            }
            setData(data);
        } catch (err) {
            setError(err); 
        }
    };

    return { data, error, fetchData };
};

export default useSearch;
