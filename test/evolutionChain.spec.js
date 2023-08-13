import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import axios from 'axios';

import app from '../src/app.js'
import { mockPokemonSpeciesAndEvolutionData } from './mocks/stub.js';

chai.use(chaiHttp);

describe('getPokemonEvolutionChainData', () => {
    let axiosGetMock;

    before(() => {
        axiosGetMock = sinon.stub(axios, 'get');
        mockPokemonSpeciesAndEvolutionData(axiosGetMock);
    });

    after(() => {
        axiosGetMock.restore();
    });

    it('returns an object with keys of "name" and "variation"', (done) => {
        chai.request(app).get('/api/evolutionChain/pokemonId/1').end((err, res) => {
            assert(typeof res.body === 'object');
            assert(Object.keys(res.body).includes('name'));
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

    it('throws an error when the object has no "name" property', (done) => {
        chai.request(app).get('/api/evolutionChain/pokemonId/0').end((err, res) => {
            console.log(err);
            console.log(res.body);

            done();
        });
    });
});