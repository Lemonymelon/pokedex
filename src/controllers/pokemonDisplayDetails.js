import { fetchPokemonDisplayDetailsById } from "../api.js";

export const getPokemonDisplayDetailsById = (req, res, next) => {
    const { id } = req.params;

    fetchPokemonDisplayDetailsById(id)
        .then((pokemonDisplayData) => {
            if (!pokemonDisplayData) {
                return Promise.reject({
                    status: 404,
                    message: 'No display data found!'
                });
            }

            res.status(200).send(pokemonDisplayData);
        })
        .catch(next);
};