
import {request, response, NextFunction, Request, Response} from 'express';
import {errorHandling} from '../../../../src/infra/rest/middlewares/error-handling';
import {UrlIdValidationError} from '../../../../src/domain/errors/url-id-validation-error';
import {SecretNotFoundError} from '../../../../src/domain/errors/secret-not-found-error';
import {SecretValidationError} from '../../../../src/domain/errors/secret-validation-error';

describe('ErrorHandling tests', () => {
    it('Should throw UrlIdValidation error when sending UrlIdValidationError', () => {
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        const next: NextFunction = jest.fn();
        const error: UrlIdValidationError = new UrlIdValidationError('UrlId is too short');
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();

        errorHandling(error, req, res, next);

        expect(next).toBeCalledTimes(0);
        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({
            name: UrlIdValidationError.name,
            message: 'UrlId is too short'
        });
    });
    it('Should throw SecretNotFoundError error when sending SecretNotFoundError', () => {
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        const next: NextFunction = jest.fn();
        const error: SecretNotFoundError = new SecretNotFoundError();
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();

        errorHandling(error, req, res, next);

        expect(next).toBeCalledTimes(0);
        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({
            name: SecretNotFoundError.name,
            message: 'Secret was not found'
        });
    });
    it('Should throw SecretValidationError error when sending SecretValidationError', () => {
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        const next: NextFunction = jest.fn();
        const error: SecretValidationError = new SecretValidationError('Secret is too short');
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();

        errorHandling(error, req, res, next);

        expect(next).toBeCalledTimes(0);
        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({
            name: SecretValidationError.name,
            message: 'Secret is too short'
        });
    });
});