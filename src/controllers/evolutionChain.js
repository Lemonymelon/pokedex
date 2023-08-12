import { getPokemonEvolutionChainData } from "../api.js";

const formatPokemonEvolutionChain = (pokemonEvolutionChainData) => {
    if (!Object.keys(pokemonEvolutionChainData).includes('evolves_to')) {
        throw new Error("Invalid object; missing property \"evolves_to\"");
    }

    if (!Object.keys(pokemonEvolutionChainData).includes('species')) {
        throw new Error("Invalid object; missing property \"species\"");
    }

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

export const getPokemonEvolutionChainByPokemonId = (req, res, next) => {
    const { pokemonId } = req.params;

    getPokemonEvolutionChainData(pokemonId)
        .then((pokemonEvolutionChainData) => {
            if (!pokemonEvolutionChainData) {
                return Promise.reject({
                    status: 404,
                    message: 'No evolution chain found!'
                });
            }

            res.status(200).send(
                formatPokemonEvolutionChain(pokemonEvolutionChainData)
            );
        })
        .catch(next);
};