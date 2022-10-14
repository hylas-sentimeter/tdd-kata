export class UrlIdTooShortError extends Error {
    constructor() {
        super('UrlId is less than 10 character');
        this.name = UrlIdTooShortError.name;
    }
}