import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import axios from 'axios';

import app from '../src/app.js'
import { mockPokemonData } from './mocks/stubs/pokemonStub.js';

chai.use(chaiHttp);

describe('getPokemonDisplayDetailsById', () => {
    let axiosGetMock;

    before(() => {
        axiosGetMock = sinon.stub(axios, 'get');
        mockPokemonData(axiosGetMock);
    });

    after(() => {
        axiosGetMock.restore();
    });

    it('returns an object with keys of "id", "name" and "srpite"', (done) => {
        chai.request(app).get('/api/pokemon/id/1').end((err, res) => {
            assert(typeof res.body === 'object');
            assert(Object.keys(res.body).includes('id'));
            assert(Object.keys(res.body).includes('name'));
            assert(Object.keys(res.body).includes('sprite'));
            done();
        });
    });

    it('returns an object with correct values', (done) => {
        chai.request(app).get('/api/pokemon/id/1').end((err, res) => {
            expect(res.body.id).to.equal('1');
            expect(res.body.name).to.equal('bulbasaur');
            expect(res.body.sprite).to.equal('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png');
        });

        chai.request(app).get('/api/pokemon/id/100').end((err, res) => {
            expect(res.body.id).to.equal('100');
            expect(res.body.name).to.equal('voltorb');
            expect(res.body.sprite).to.equal('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png');
            done();
        });
    });
});