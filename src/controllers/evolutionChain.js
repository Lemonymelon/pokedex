import { fetchPokemonEvolutionChainData } from "../api.js";
import { parseStringToBoolean } from "../utils/bool.js";

export const formatPokemonEvolutionChain = (pokemonEvolutionChainData, includeId = false) => {
    const formattedPokemonEvolutionChain = {};

    const { species: { name, url }, evolves_to } = pokemonEvolutionChainData;

    formattedPokemonEvolutionChain.name = name;

    if (parseStringToBoolean(includeId)) {
        const pokemonId = url.match(/\/(\d+)\/$/)[1];
        formattedPokemonEvolutionChain.id = pokemonId;
    }

    if (evolves_to.length > 0) {
        formattedPokemonEvolutionChain.variations = evolves_to.map((variation) => formatPokemonEvolutionChain(variation));
    } else {
        formattedPokemonEvolutionChain.variations = evolves_to;

        return formattedPokemonEvolutionChain;
    }

    return formattedPokemonEvolutionChain;
};

export const getPokemonEvolutionChainByPokemonId = (req, res, next) => {
    const { pokemonId } = req.params;
    const { includeId } = req.query;

    fetchPokemonEvolutionChainData(pokemonId)
        .then((pokemonEvolutionChainData) => {
            if (!pokemonEvolutionChainData) {
                return Promise.reject({
                    status: 404,
                    message: 'No evolution chain found!'
                });
            }

            res.status(200).send(
                formatPokemonEvolutionChain(pokemonEvolutionChainData, includeId)
            );
        })
        .catch(next);
};