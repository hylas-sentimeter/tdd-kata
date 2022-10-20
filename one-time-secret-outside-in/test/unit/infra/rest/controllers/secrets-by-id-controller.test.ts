import {SecretsByIdController} from '../../../../../src/infra/rest/controllers/secrets-by-id-controller';
import {request, response, NextFunction, Request, Response} from 'express';
import {UrlIdValidationError} from '../../../../../src/domain/errors/url-id-validation-error';
import {SecretNotFoundError} from '../../../../../src/domain/errors/secret-not-found-error';
import {SecretRetriever} from '../../../../../src/services/secret-retriever';
import {UrlId} from '../../../../../src/domain/models/url-id';
import {Secret} from '../../../../../src/domain/models/secret';

describe('SecretsByIdController tests', () => {
    it('Should throw error when urlId is too short', async () => {
            const req: Request = expect.any(request);
            const res: Response = expect.any(response);
            const next: NextFunction = jest.fn();

            req.params = {urlId: '2short'};
            const secretRetriever: SecretRetriever = {
                retrieveSecretById: jest.fn()
            };
            const controller = new SecretsByIdController(secretRetriever);
            await controller.retrieveSecretById(req, res, next);
            expect(secretRetriever.retrieveSecretById).toBeCalledTimes(0);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(new UrlIdValidationError('UrlId is too short'));
        }
    );
    it('Should throw error when secret was not found', async () => {
            const req: Request = expect.any(request);
            const res: Response = expect.any(response);
            const next: NextFunction = jest.fn();

            req.params = {urlId: 'notexistsecret'};
            const secretRetriever: SecretRetriever = {
                retrieveSecretById: jest.fn().mockImplementation(async () => {
                    throw new SecretNotFoundError();
                })
            };
            const controller = new SecretsByIdController(secretRetriever);
            await controller.retrieveSecretById(req, res, next);

            expect(secretRetriever.retrieveSecretById).toBeCalledTimes(1);
            expect(secretRetriever.retrieveSecretById).toBeCalledWith(new UrlId('notexistsecret'));
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(new SecretNotFoundError());
        }
    );
    it('Should return 200 status and secret ', async () => {
            const req: Request = expect.any(request);
            const res: Response = expect.any(response);
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            const next: NextFunction = jest.fn();
            req.params = {urlId: 'existsecret'};
            const secretRetriever: SecretRetriever = {
                retrieveSecretById: jest.fn().mockResolvedValue(new Secret('abcd'))
            };
            const controller = new SecretsByIdController(secretRetriever);
            await controller.retrieveSecretById(req, res, next);
            expect(secretRetriever.retrieveSecretById).toBeCalledTimes(1);
            expect(secretRetriever.retrieveSecretById).toBeCalledWith(new UrlId('existsecret'));
            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledTimes(1);
            expect(res.json).toBeCalledWith({secret: 'abcd'});
            expect(next).toBeCalledTimes(0);


        }
    );
});