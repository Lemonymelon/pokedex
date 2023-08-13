import { createRequire } from "module";
const require = createRequire(import.meta.url);

const speciesData = require('../mock-data/species.json');
import { pokemonApiBaseUrl } from "../../../src/api.js";

export const mockSpeciesData = (axiosGetMock) => {
    const pokemonSpeciesBaseUrl = `${pokemonApiBaseUrl}/pokemon-species`;

    const pokemonSpecies1DataUrl = `${pokemonSpeciesBaseUrl}/1`;
    const pokemonSpecies2DataUrl = `${pokemonSpeciesBaseUrl}/2`;
    const pokemonSpecies3DataUrl = `${pokemonSpeciesBaseUrl}/3`;
    const pokemonSpecies43DataUrl = `${pokemonSpeciesBaseUrl}/43`;
    const pokemonSpecies133DataUrl = `${pokemonSpeciesBaseUrl}/133`;
    const pokemonSpecies142DataUrl = `${pokemonSpeciesBaseUrl}/142`;
    const pokemonSpecies236DataUrl = `${pokemonSpeciesBaseUrl}/236`;
    const pokemonSpecies0DataUrl = `${pokemonSpeciesBaseUrl}/0`;
    const pokemonSpecies666DataUrl = `${pokemonSpeciesBaseUrl}/666`;

    axiosGetMock.withArgs(pokemonSpecies1DataUrl).resolves({ data: speciesData["1"] });
    axiosGetMock.withArgs(pokemonSpecies2DataUrl).resolves({ data: speciesData["2"] });
    axiosGetMock.withArgs(pokemonSpecies3DataUrl).resolves({ data: speciesData["3"] });
    axiosGetMock.withArgs(pokemonSpecies43DataUrl).resolves({ data: speciesData["43"] });
    axiosGetMock.withArgs(pokemonSpecies133DataUrl).resolves({ data: speciesData["133"] });
    axiosGetMock.withArgs(pokemonSpecies142DataUrl).resolves({ data: speciesData["142"] });
    axiosGetMock.withArgs(pokemonSpecies236DataUrl).resolves({ data: speciesData["236"] });
    axiosGetMock.withArgs(pokemonSpecies0DataUrl).resolves({ data: speciesData["0"] });
    axiosGetMock.withArgs(pokemonSpecies666DataUrl).resolves({ data: speciesData["666"] });
};