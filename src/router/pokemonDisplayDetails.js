import { Router } from "express";

import { getPokemonDisplayDetailsById } from "../controllers/pokemonDisplayDetails.js";

const pokemonRouter = Router();

pokemonRouter.route('/id/:id').get(getPokemonDisplayDetailsById);

export default pokemonRouter;