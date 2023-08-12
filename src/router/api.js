import { Router } from "express";
import evolutionChainRouter from "./evolutionChain.js";

const apiRouter = Router();

apiRouter.use('/evolutionChain', evolutionChainRouter)

export default apiRouter;