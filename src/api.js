import axios from 'axios';

import { extractIdFromUrl } from './utils/extractIdFromUrl.js';

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

export const fetchPokemon = async (limit = 20, offset = 0) => {
    const pokemonUrl = `${pokemonApiBaseUrl}/pokemon?limit=${limit}&offset=${offset}`;

    const { data: { results } } = await axios.get(pokemonUrl);

    const pokemonData = results.map(({ name, url }) => {
        return {
            name,
            id: extractIdFromUrl(url)
        };
    });

    return pokemonData;
};
