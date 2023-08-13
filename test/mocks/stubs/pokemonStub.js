import { createRequire } from "module";
const require = createRequire(import.meta.url);

const pokemonData = require('../mock-data/pokemon.json');

export const mockPokemonData = (axiosGetMock) => {
    const pokemonApiBaseUrl = 'https://pokeapi.co/api/v2';
    const pokemonBaseUrl = `${pokemonApiBaseUrl}/pokemon`;

    const pokemon1DataUrl = `${pokemonBaseUrl}/1`;
    const pokemon100DataUrl = `${pokemonBaseUrl}/100`;

    axiosGetMock.withArgs(pokemon1DataUrl).resolves({ data: pokemonData["1"] });
    axiosGetMock.withArgs(pokemon100DataUrl).resolves({ data: pokemonData["100"] });
};