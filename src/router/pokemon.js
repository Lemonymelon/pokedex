import { Router } from "express";

import { getPokemonDisplayDetailsById, getPokemon } from "../controllers/pokemon.js";

const pokemonRouter = Router();

pokemonRouter.route('/').get(getPokemon);
pokemonRouter.route('/displayDetails/:id').get(getPokemonDisplayDetailsById);

export default pokemonRouter;