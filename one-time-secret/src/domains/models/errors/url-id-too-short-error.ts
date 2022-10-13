export class UrlIdTooShortError extends Error {
    constructor() {
        super();
        this.message = 'UrlId is less than 10 character';
    }
}