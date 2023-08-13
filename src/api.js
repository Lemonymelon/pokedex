import axios from 'axios';

export const pokemonApiBaseUrl = 'https://pokeapi.co/api/v2';

export const fetchPokemonEvolutionChainData = async (pokemonId) => {
    const pokemonSpeciesUrl = `${pokemonApiBaseUrl}/pokemon-species/${pokemonId}`;

    const { data: pokemonSpeciesData } = await axios.get(pokemonSpeciesUrl);

    const { evolution_chain: {
        url: evolutionChainUrl
    }
    } = pokemonSpeciesData;

    const { data: pokemonChainData } = await axios.get(evolutionChainUrl);
    const { chain } = pokemonChainData;

    return chain;
};

export const fetchPokemonDisplayDetailsById = async (pokemonId) => {
    const pokemonUrl = `${pokemonApiBaseUrl}/pokemon/${pokemonId}`;

    const {
        data: {
            name, sprites: {
                front_default: sprite
            }
        }
    } = await axios.get(pokemonUrl);

    return { id: pokemonId, name, sprite };
};
