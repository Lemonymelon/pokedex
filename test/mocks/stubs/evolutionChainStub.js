import { createRequire } from "module";
const require = createRequire(import.meta.url);

const evolutionChainData = require('../mock-data/evolutionChain.json');
import { pokemonApiBaseUrl } from "../../../src/api.js";

export const mockEvolutionChainData = (axiosGetMock) => {
    const pokemonEvolutionChainBaseUrl = `${pokemonApiBaseUrl}/evolution-chain`;

    const pokemonEvolutionChain1DataUrl = `${pokemonEvolutionChainBaseUrl}/1/`;
    const pokemonEvolutionChain18DataUrl = `${pokemonEvolutionChainBaseUrl}/18/`;
    const pokemonEvolutionChain47DataUrl = `${pokemonEvolutionChainBaseUrl}/47/`;
    const pokemonEvolutionChain67DataUrl = `${pokemonEvolutionChainBaseUrl}/67/`;
    const pokemonEvolutionChain71DataUrl = `${pokemonEvolutionChainBaseUrl}/71/`;

    axiosGetMock.withArgs(pokemonEvolutionChain1DataUrl).resolves({ data: evolutionChainData["1"] });
    axiosGetMock.withArgs(pokemonEvolutionChain18DataUrl).resolves({ data: evolutionChainData["18"] });
    axiosGetMock.withArgs(pokemonEvolutionChain47DataUrl).resolves({ data: evolutionChainData["47"] });
    axiosGetMock.withArgs(pokemonEvolutionChain67DataUrl).resolves({ data: evolutionChainData["67"] });
    axiosGetMock.withArgs(pokemonEvolutionChain71DataUrl).resolves({ data: evolutionChainData["71"] });
};