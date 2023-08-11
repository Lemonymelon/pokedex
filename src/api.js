import axios from 'axios';

const pokemonApiBaseUrl = 'https://pokeapi.co/api/v2';

export const getPokemonEvolutionChainData = async (pokemonId) => {
    const { data: pokemonSpeciesData } = await axios.get(`${pokemonApiBaseUrl}/pokemon-species/${pokemonId}`);
    const { evolution_chain: { url: evolutionChainUrl } } = pokemonSpeciesData;

    const { data: pokemonChainData } = await axios.get(evolutionChainUrl);
    const { chain } = pokemonChainData;

    return chain;
};