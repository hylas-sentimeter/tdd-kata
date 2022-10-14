import {NextFunction, Request, Response} from 'express';
import {ValidationError} from '../../../domains/models/errors/validation-error';
import {SecretNotFoundInRepositoryError} from '../../../domains/models/errors/secret-not-found-in-repository-error';
import {SecretTooShortError} from '../../../domains/models/errors/secret-too-short-error';
import {UrlIdTooShortError} from '../../../domains/models/errors/url-id-too-short-error';

export function errorHandler(err: Error, request: Request, response: Response, next: NextFunction) {
    if (err instanceof ValidationError || err instanceof SecretTooShortError || err instanceof UrlIdTooShortError) {
        response.status(400).json({
            name: err.name,
            message: err.message
        });
    } else if (err instanceof SecretNotFoundInRepositoryError) {
        response.status(404).json({
            name: err.name,
            message: err.message
        });
    } else {
        response.status(500).json({
            name: 'Internal Server Error',
            message: 'Something went wrong'
        });
    }
}