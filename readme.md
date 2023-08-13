# Exercise Scheduler

This project is a an API for communicating with a third party API to gather information of Pokemon evolution trees.

## Initial setup (local)

Use either [yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/) to start the server.
```bash
yarn dev
```
or
```bash
npm run dev
```

## API routes and endpoints

Note: the colon notation '/endpoint/:parameter' is a placeholder and should be replaced with the appropriate value e.g. '/pokemon/1'.

### `http://localhost:9090/api` (local)

### `/evolutionChain/pokemonId/:pokemonId`

**GET :**  get the entire evolution tree of a given Pokemon

example input:

```
http://localhost:9090/api/evolutionChain/pokemonId/1
```
example output:

```
{
    "name": "bulbasaur",
    "variations": [
        {
            "name": "ivysaur",
            "variations": [
                {
                    "name": "venusaur",
                    "variations": []
                }
            ]
        }
    ]
}
```

### `/pokemon/displayDetails/:pokemonId`

**GET :**  get basic information for the display of a given Pokemon

example input:

```
http://localhost:9090/api/pokemon/displayDetails/1
```
example output:

```
{
    "id": "1",
    "name": "bulbasaur",
    "sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
}
```