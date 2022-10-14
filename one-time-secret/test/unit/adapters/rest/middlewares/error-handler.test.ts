import {NextFunction, request, Request, response, Response} from 'express';
import {errorHandler} from '../../../../src/adapters/rest/middlewares/error-handler';
import {ValidationError} from '../../../../src/domains/models/errors/validation-error'
import {
    SecretNotFoundInRepositoryError
} from '../../../../src/domains/models/errors/secret-not-found-in-repository-error';
describe('ErrorHandler Tests', () => {
    it('Should send a uncontrolled error', () => {
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        const next: NextFunction = jest.fn();
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();


        const err = new Error('Server got fired')
        errorHandler(err, req, res, next);
        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({name: 'Internal Server Error', message: 'Something went wrong'});
    });
    it('Should send a validation error', () => {
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        const next: NextFunction = jest.fn();
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();


        const err = new ValidationError('body is not present')
        errorHandler(err, req, res, next);
        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({name: err.name, message: err.message});
    });
    it('Should send a validation error', () => {
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        const next: NextFunction = jest.fn();
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();


        const err = new ValidationError('body is not present')
        errorHandler(err, req, res, next);
        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({name: err.name, message: err.message});
    });
    it('Should send a secret not found error', () => {
        const req: Request = expect.any(request);
        const res: Response = expect.any(response);
        const next: NextFunction = jest.fn();
        res.status = jest.fn().mockReturnThis();
        res.json = jest.fn();
        const err = new SecretNotFoundInRepositoryError()
        errorHandler(err, req, res, next);
        expect(res.status).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(404);
        expect(res.json).toBeCalledTimes(1);
        expect(res.json).toBeCalledWith({name: err.name, message: err.message});
    });
});
