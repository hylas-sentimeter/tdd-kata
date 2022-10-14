import supertest from 'supertest';
import server from '../../src/server';
import {SecretModel} from '../../src/adapters/repositories/secret-model';

const request = supertest(server.app);

describe('Store secret from one time secret API End2End tests', () => {
    beforeAll(async () => {
        await SecretModel.deleteMany({});
    });

    it('Should store a secret in the database', async () => {
        const res = await request.post('/api/v1/secrets').send({secret: '1234'});
        expect(res.status).toBe(201);
        expect(res.body.urlId.length).toBeGreaterThanOrEqual(10);

        const doc = await SecretModel.findOne({secret: '1234'});
        expect(doc).not.toBeNull();
        expect(doc.secret).toBe('1234');
        expect(doc.urlId.length).toBeGreaterThanOrEqual(10);
    });
    it('Should throw an error when sending secret length is less than 3 characters', async () => {
        const res = await request.post('/api/v1/secrets').send({secret: '11'});
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            name: 'SecretTooShortError',
            message: 'Secret is less than 3 characters'
        })
    });
});