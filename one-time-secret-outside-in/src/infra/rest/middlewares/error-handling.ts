import {Request, Response, NextFunction} from 'express';
import {UrlIdValidationError} from '../../../domain/errors/url-id-validation-error';
import {SecretNotFoundError} from '../../../domain/errors/secret-not-found-error';
import {SecretValidationError} from '../../../domain/errors/secret-validation-error';

export function errorHandling(error: Error, request: Request, response: Response, next: NextFunction) {
    if(error instanceof SecretNotFoundError) {
        response.status(404);
        response.json({
            name: error.name,
            message: error.message
        });
    }
    else if (error instanceof UrlIdValidationError || error instanceof SecretValidationError) {
        response.status(400);
        response.json({
            name: error.name,
            message: error.message
        });
    }else {
        response.status(500);
        response.json({
            name: 'InternalServerError',
            message: 'Something went wrong'
        });
    }
}