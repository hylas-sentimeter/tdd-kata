export class SecretTooShortError extends Error {
    constructor() {
        super();
        this.message = 'Secret is less than 3 characters';
    }
}