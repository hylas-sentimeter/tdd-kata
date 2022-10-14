import mongoose from 'mongoose';
import supertest from 'supertest';
import server from '../../src/server';
import {SecretModel} from '../../src/adapters/repositories/secret-model';

const request = supertest(server.app);

describe('Get secret from one time secret End2End integration tests', () => {
    beforeAll(async () => {
        await SecretModel.deleteMany({});
        await SecretModel.create({
            secret: '1234',
            urlId: '123412341234'
        });
    });

    it('Should retrieve a secret from database', async () => {
        const res = await request.get('/api/v1/secrets/123412341234');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({secret: '1234'});
    });
    it('Should throw error if same secret retrieve twice', async () => {
        const res = await request.get('/api/v1/secrets/123412341234');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({
            name: 'SecretNotFoundInRepositoryError',
            message: 'Secret was not found on database'
        });
    });
    it('Should throw error if url id is invalid', async () => {
        const res = await request.get('/api/v1/secrets/11');
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            name: 'UrlIdTooShortError',
            message: 'UrlId is less than 10 character'
        });
    });

});