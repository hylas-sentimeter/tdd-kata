import {NextFunction, request, Request, Response, response} from 'express';
import {ValidationError} from '../../../../src/domains/models/errors/validation-error';
import {SecretStorer} from '../../../../src/domains/ports/in/secret-storer';
import {SecretsController} from '../../../../src/adapters/rest/controllers/secrets-controller';
import {UrlId} from '../../../../src/domains/models/url-id';

describe('SecretsController Tests', () => {
    it('Should throw validation error when if the body of request is not provided', () => {
        const next: NextFunction = jest.fn();
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        const secretStorer: SecretStorer = {
            storeSecret: jest.fn()
        };
        const secretsController = new SecretsController(secretStorer);
        secretsController.createSecret(req, res, next);
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(new ValidationError('Request body is not valid'));
    });
    it('Should throw validation error when if the body not have secret', () => {
        const next: NextFunction = jest.fn();
        const req: Request = expect.any(request);
        req.body = {abc: 'abc'};
        const res: Response = expect.any(response);
        const secretStorer: SecretStorer = {
            storeSecret: jest.fn()
        };
        const secretsController = new SecretsController(secretStorer);
        secretsController.createSecret(req, res, next);
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(new ValidationError('Request body is not valid'));
    });
    it('Should throw validation error when if the secret type is not string', () => {
        const next: NextFunction = jest.fn();
        const req: Request = expect.any(request);
        req.body = {secret: 101};
        const res: Response = expect.any(response);
        const secretStorer: SecretStorer = {
            storeSecret: jest.fn()
        };
        const secretsController = new SecretsController(secretStorer);
        secretsController.createSecret(req, res, next);
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(new ValidationError('Request body is not valid'));
    });
    it('Should create secret', async () => {
        const next: NextFunction = jest.fn();
        const req: Request = expect.any(request);
        req.body = {secret: 'abcdabcd'};
        const res: Response = expect.any(response);
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();
        const secretStorer: SecretStorer = {
            storeSecret: jest.fn().mockResolvedValue(new UrlId('abcdabcdabcd'))
        };
        const secretsController = new SecretsController(secretStorer);
        await secretsController.createSecret(req, res, next);
        expect(next).toBeCalledTimes(0);
        expect(res.status).toBeCalledTimes(1)
        expect(res.status).toBeCalledWith(201)
        expect(res.json).toBeCalledTimes(1)
        expect(res.json).toBeCalledWith({
            urlId: 'abcdabcdabcd'
        })
    });
});