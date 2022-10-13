export class SecretNotFoundInRepositoryError extends Error {
    constructor() {
        super('Secret was not found on database');
        this.name = 'SecretNotFoundInRepositoryError'
    }
}