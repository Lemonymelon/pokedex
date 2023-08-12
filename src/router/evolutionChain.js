import { Router } from "express";

import { getPokemonEvolutionChainByPokemonId } from "../controllers/evolutionChain.js";

const evolutionChainRouter = Router();

evolutionChainRouter.route('/pokemonId/:pokemonId').get(getPokemonEvolutionChainByPokemonId);

export default evolutionChainRouter;