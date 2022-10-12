import {greeting} from '../src/greeting';

describe('Greeting tests', () => {
    it('Should greet morning when it is in the morning', () => {
        Date.prototype.getHours = jest.fn().mockReturnValue(7);
        expect(greeting()).toBe('Good morning!');
    });
    it('Should greet afternoon when it is in the afternoon', () => {
        Date.prototype.getHours = jest.fn().mockReturnValue(13);
        expect(greeting()).toBe('Good afternoon!');
    });
    it('Should greet evening when it is in the evening', () => {
        Date.prototype.getHours = jest.fn().mockReturnValue(21);
        expect(greeting()).toBe('Good evening!');
    });
    it('Should greet night when it is in the night', () => {
        Date.prototype.getHours = jest.fn().mockReturnValue(23);
        expect(greeting()).toBe('Good night!');
    });
    it('Should greet night when it is in the dawn', () => {
        Date.prototype.getHours = jest.fn().mockReturnValue(4);
        expect(greeting()).toBe('Good night!');
    });
});
