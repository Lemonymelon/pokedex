export const extractIdFromUrl = (url) => {
    const pokemonId = url.match(/\/(\d+)\/$/)[1];
    return pokemonId;
}