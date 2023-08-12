import { createRequire } from "module";
const require = createRequire(import.meta.url);

const evolutionChainData = require('./mock-data/evolutionChain.json');
const speciesData = require('./mock-data/species.json');

export const mockPokemonSpeciesAndEvolutionData = (axiosGetMock) => {

    const pokemonApiBaseUrl = 'https://pokeapi.co/api/v2';
    const pokemonSpeciesBaseUrl = `${pokemonApiBaseUrl}/pokemon-species`;
    const pokemonEvolutionChainBaseUrl = `${pokemonApiBaseUrl}/evolution-chain`;

    const pokemonSpecies1DataUrl = `${pokemonSpeciesBaseUrl}/1`;
    const pokemonSpecies2DataUrl = `${pokemonSpeciesBaseUrl}/2`;
    const pokemonSpecies3DataUrl = `${pokemonSpeciesBaseUrl}/3`;

    const pokemonEvolutionChain1DataUrl = `${pokemonEvolutionChainBaseUrl}/1/`;

    axiosGetMock.withArgs(pokemonSpecies1DataUrl).resolves({ data: speciesData["1"] });
    axiosGetMock.withArgs(pokemonSpecies2DataUrl).resolves({ data: speciesData["2"] });
    axiosGetMock.withArgs(pokemonSpecies3DataUrl).resolves({ data: speciesData["3"] });

    axiosGetMock.withArgs(pokemonEvolutionChain1DataUrl).resolves({ data: evolutionChainData["1"] });
}


