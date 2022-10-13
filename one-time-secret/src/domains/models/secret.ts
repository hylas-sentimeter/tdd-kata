import {SecretTooShortError} from './errors/secret-too-short-error';

export class Secret {
    constructor(private secret: string) {
        if(secret.length < 3) throw new SecretTooShortError();
    }
}