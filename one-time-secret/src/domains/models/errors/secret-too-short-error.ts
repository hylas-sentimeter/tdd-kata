export class SecretTooShortError extends Error {
    constructor() {
        super('Secret is less than 3 characters');
        this.name = SecretTooShortError.name;
    }
}