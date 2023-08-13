import { Router } from "express";

import { getPokemonDisplayDetailsById } from "../controllers/pokemonDisplayDetails.js";

const pokemonRouter = Router();

pokemonRouter.route('/displayDetails/:id').get(getPokemonDisplayDetailsById);

export default pokemonRouter;