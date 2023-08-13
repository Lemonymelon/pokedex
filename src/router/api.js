import { Router } from "express";
import evolutionChainRouter from "./evolutionChain.js";
import pokemonRouter from "./pokemonDisplayDetails.js";

const apiRouter = Router();

apiRouter.use('/evolutionChain', evolutionChainRouter)
apiRouter.use('/pokemon', pokemonRouter)

export default apiRouter;