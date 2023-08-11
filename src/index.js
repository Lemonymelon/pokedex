import { getPokemonEvolutionChainData } from "./api.js";

const formatPokemonEvolutionChain = (pokemonEvolutionChainData) => {
    const formattedPokemonEvolutionChain = {};

    const { species: { name }, evolves_to } = pokemonEvolutionChainData;

    formattedPokemonEvolutionChain.name = name;

    if (evolves_to.length > 0) {
        formattedPokemonEvolutionChain.variations = evolves_to.map((variation) => formatPokemonEvolutionChain(variation));
    } else {
        formattedPokemonEvolutionChain.variations = evolves_to;

        return formattedPokemonEvolutionChain;
    }

    return formattedPokemonEvolutionChain;
};

const getPokemonEvolutionChain = async (pokemonId) => {
    const pokemonEvolutionChainData = await getPokemonEvolutionChainData(pokemonId);

    return formatPokemonEvolutionChain(pokemonEvolutionChainData);
};