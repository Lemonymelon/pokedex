import { fetchPokemonEvolutionChainData, fetchPokemonDisplayDetailsById } from "../api.js";
import { parseStringToBoolean } from "../utils/bool.js";
import { extractIdFromUrl } from "../utils/extractIdFromUrl.js";

export const formatPokemonEvolutionChain = async (pokemonEvolutionChainData, includeId = false, includeSprite = false) => {

    const formattedPokemonEvolutionChain = {};

    const { species: { name, url }, evolves_to } = pokemonEvolutionChainData;

    formattedPokemonEvolutionChain.name = name;

    if (parseStringToBoolean(includeId)) {
        const pokemonId = extractIdFromUrl(url);
        formattedPokemonEvolutionChain.id = pokemonId;

        if (parseStringToBoolean(includeSprite)) {
            const { sprite } = await fetchPokemonDisplayDetailsById(pokemonId);

            formattedPokemonEvolutionChain.sprite = sprite;
        }
    }

    if (evolves_to.length > 0) {
        formattedPokemonEvolutionChain.variations = await Promise.all(
            evolves_to.map(async (variation) => {
                const formattedPokemonEvolutionChain = await formatPokemonEvolutionChain(variation, includeId, includeSprite);

                return formattedPokemonEvolutionChain;
            })
        );
    } else {
        formattedPokemonEvolutionChain.variations = evolves_to;
    }

    return formattedPokemonEvolutionChain;
};

export const getPokemonEvolutionChainByPokemonId = async (req, res, next) => {
    const { pokemonId } = req.params;
    const { includeId, includeSprite } = req.query;

    fetchPokemonEvolutionChainData(pokemonId)
        .then(async (pokemonEvolutionChainData) => {
            if (!pokemonEvolutionChainData) {
                return Promise.reject({
                    status: 404,
                    message: 'No evolution chain found!'
                });
            }

            const formattedPokemonEvolutionChain = await formatPokemonEvolutionChain(pokemonEvolutionChainData, includeId, includeSprite);

            res.status(200).send(formattedPokemonEvolutionChain);
        })
        .catch(next);
};