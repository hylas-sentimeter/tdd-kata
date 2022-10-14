import {NextFunction, request, Request, Response, response} from 'express';
import {SecretsByIdController} from '../../../../src/adapters/rest/controllers/secrets-by-id-controller';
import {ValidationError} from '../../../../src/domains/models/errors/validation-error';
import {SecretRepository} from '../../../../src/domains/ports/out/secret-repository';
import {
    SecretNotFoundInRepositoryError
} from '../../../../src/domains/models/errors/secret-not-found-in-repository-error';
import {SecretRetriever} from '../../../../src/domains/ports/in/secret-retriever';
import {Secret} from '../../../../src/domains/models/secret';

describe('SecretsByIdController Tests', () => {
    it('Should throw validation error when sending invalid URL', () => {
        const next: NextFunction = jest.fn();
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        const secretRetriever: SecretRetriever = {
            retrieveSecret: jest.fn()
        };
        const secretByIdController = new SecretsByIdController(secretRetriever);
        secretByIdController.retrieveSecretByUrlId(req, res, next);
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(new ValidationError('Url is not valid'));
    });
    it('Should throw not found error when sending url that not exist on database', async () => {
        const next: NextFunction = jest.fn();
        const req: Request = expect.any(request);
        req.params = {urlId: 'abcadabcadabcad'};
        const res: Response = expect.any(response);
        const secretRetriever: SecretRetriever = {
            retrieveSecret: jest.fn().mockImplementation(() => {
                throw new SecretNotFoundInRepositoryError();
            })
        };
        const secretByIdController = new SecretsByIdController(secretRetriever);
        await secretByIdController.retrieveSecretByUrlId(req, res, next);
        expect(next).toBeCalledTimes(1);
        expect(next).toBeCalledWith(new SecretNotFoundInRepositoryError());
    });
    it('Should return a secret when it is found', async () => {
        const next: NextFunction = jest.fn();
        const req: Request = expect.any(request);
        req.params = {urlId: 'abcadabcadabcad'};
        const res: Response = expect.any(response);
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();
        const secretRetriever: SecretRetriever = {
            retrieveSecret: jest.fn().mockResolvedValue(new Secret('abcd'))
        };
        const secretByIdController = new SecretsByIdController(secretRetriever);
        await secretByIdController.retrieveSecretByUrlId(req, res, next);
        expect(next).toBeCalledTimes(0);
        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({secret: 'abcd'});
    });
});