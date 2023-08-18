import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import axios from 'axios';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import app from '../src/app.js'
import { mockEvolutionChainData } from './mocks/stubs/evolutionChainStub.js';
import { mockSpeciesData } from './mocks/stubs/speciesStub.js';
import { mockPokemonData } from './mocks/stubs/pokemonStub.js';
import { formatPokemonEvolutionChain } from '../src/controllers/evolutionChain.js';
const evolutionChainData = require('./mocks/mock-data/evolutionChain.json');
const pokemonData = require('./mocks/mock-data/pokemon.json')

chai.use(chaiHttp);

describe('getPokemonEvolutionChainData', () => {
    let axiosGetMock;

    before(() => {
        axiosGetMock = sinon.stub(axios, 'get');
        mockEvolutionChainData(axiosGetMock);
        mockSpeciesData(axiosGetMock);
    });

    after(() => {
        axiosGetMock.restore();
    });

    it('returns an object with keys of "name" and "variations"', (done) => {
        chai.request(app).get('/api/evolutionChain/pokemonId/1').end((err, res) => {
            assert(typeof res.body === 'object');
            assert(Object.keys(res.body).includes('name'));
            assert(Object.keys(res.body).includes('variations'));
            done();
        });
    });

    it('returns the same object when the id of any Pokemon within that evolution tree is passed', (done) => {
        let pokemon1Res;
        let pokemon2Res;
        let pokemon3Res;

        chai.request(app).get('/api/evolutionChain/pokemonId/1').end((err, res) => {
            pokemon1Res = res.body;
        });
        chai.request(app).get('/api/evolutionChain/pokemonId/2').end((err, res) => {
            pokemon2Res = res.body;
        });
        chai.request(app).get('/api/evolutionChain/pokemonId/3').end((err, res) => {
            pokemon3Res = res.body;
            done();
        });

        expect(pokemon1Res).to.deep.equal(pokemon2Res);
        expect(pokemon1Res).to.deep.equal(pokemon3Res);
    });

    it('returns an object with one tier of evolution where Pokemon has no variations', (done) => {
        chai.request(app).get('/api/evolutionChain/pokemonId/142').end((err, res) => {
            expect(res.body.name).to.equal('aerodactyl');
            expect(res.body.variations.length).to.equal(0);
            done();
        });
    });

    it('returns an object with multiple variations at the same evolution level', (done) => {
        chai.request(app).get('/api/evolutionChain/pokemonId/43').end((err, res) => {
            expect(res.body.name).to.equal('oddish');
            expect(res.body.variations[0].variations.length).to.equal(2)
        });
        chai.request(app).get('/api/evolutionChain/pokemonId/133').end((err, res) => {
            expect(res.body.name).to.equal('eevee');
            expect(res.body.variations.length).to.equal(8)
        });
        chai.request(app).get('/api/evolutionChain/pokemonId/236').end((err, res) => {
            expect(res.body.name).to.equal('tyrogue');
            expect(res.body.variations.length).to.equal(3)
            done();
        });
    });
});

describe('formatEvolutionChain', () => {
    let axiosGetMock;

    before(() => {
        axiosGetMock = sinon.stub(axios, 'get');
        mockPokemonData(axiosGetMock);
    });

    after(() => {
        axiosGetMock.restore();
    });
    it('correctly formats raw evolution chain data', async () => {
        const formattedChain1 = await formatPokemonEvolutionChain(evolutionChainData["1"].chain);
        expect(formattedChain1.name).to.equal('bulbasaur');
        expect(formattedChain1.variations[0].name).to.equal('ivysaur');
        expect(formattedChain1.variations[0].variations[0].name).to.equal('venusaur');

        const formattedChain67 = await formatPokemonEvolutionChain(evolutionChainData["67"].chain);
        expect(formattedChain67.name).to.equal('eevee');
        expect(formattedChain67.variations[0].name).to.equal('vaporeon');
        expect(formattedChain67.variations[1].name).to.equal('jolteon');
        expect(formattedChain67.variations[2].name).to.equal('flareon');
        expect(formattedChain67.variations[3].name).to.equal('espeon');
        expect(formattedChain67.variations[4].name).to.equal('umbreon');
        expect(formattedChain67.variations[5].name).to.equal('leafeon');
        expect(formattedChain67.variations[6].name).to.equal('glaceon');
        expect(formattedChain67.variations[7].name).to.equal('sylveon');
    })

    it('includes pokemon ids when passed "true" as includeId argument', async () => {
        const formattedChain1 = await formatPokemonEvolutionChain(evolutionChainData["1"].chain, "true");
        expect(formattedChain1.id).to.equal('1');
        expect(formattedChain1.variations[0].id).to.equal('2');
        expect(formattedChain1.variations[0].variations[0].id).to.equal('3');
    });

    it('includes pokemon sprites when passed "true" as includeId argument and "true" as includeSprite argument', async () => {
        const formattedChain1 = await formatPokemonEvolutionChain(evolutionChainData["1"].chain, "true", "true");

        expect(formattedChain1.sprite).to.equal('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
        expect(formattedChain1.variations[0].sprite).to.equal('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png');
        expect(formattedChain1.variations[0].variations[0].sprite).to.equal('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png');
    });

    it('does not include pokemon sprites when passed "false" as includeId argument and "true" as includeSprite argument', async () => {
        const formattedChain1 = await formatPokemonEvolutionChain(evolutionChainData["1"].chain, "false", "true");

        expect(formattedChain1.sprite).to.equal(undefined);
        expect(formattedChain1.variations[0].sprite).to.equal(undefined);
        expect(formattedChain1.variations[0].variations[0].sprite).to.equal(undefined);
    });
})