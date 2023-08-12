import { getPokemonEvolutionChainData } from "../api.js";

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