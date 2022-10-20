import {SecretValidationError} from '../errors/secret-validation-error';

export class Secret {
    constructor(private secret: string) {
        if (secret.length < 3) throw new SecretValidationError('Secret is too short');
    }

    toString() {
        return this.secret
    }
}