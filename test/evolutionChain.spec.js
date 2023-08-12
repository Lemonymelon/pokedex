import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import axios from 'axios';

import app from '../src/app.js'
import { mockPokemonSpeciesAndEvolutionData } from './mocks/stub.js';

chai.use(chaiHttp);

describe('formatPokemonEvolutionChain', () => {
    let axiosGetMock;

    before(() => {
        axiosGetMock = sinon.stub(axios, 'get');
        mockPokemonSpeciesAndEvolutionData(axiosGetMock);
    });

    after(() => {
        axiosGetMock.restore();
    });

    it('returns an object', (done) => {
        chai.request(app).get('/api/evolutionChain/pokemonId/1').end((err, res) => {
            assert(typeof res.body === 'object');
            done();
        });
    });

    it('returns an object with keys of "name" and "variation"', (done) => {
        chai.request(app).get('/api/evolutionChain/pokemonId/1').end((err, res) => {
            console.log(res.body);
            assert(Object.keys(res.body).includes('name'));
            done();
        });
    });
});