import {UniqueTokenGenerator} from '../../../src/adapters/external-services/unique-token-generator';

jest.mock('uniqid');
import uniqid from 'uniqid';

const mockUniqid = uniqid as jest.MockedFunction<typeof uniqid>;


describe('UniqueTokenGenerator tests', () => {
    it('Should generate a token that is longer than 10 characters', () => {
        mockUniqid.mockReturnValue('abcdabcdabcdabcd');
        const uniqueTokenGenerator = new UniqueTokenGenerator();
        const token = uniqueTokenGenerator.generateToken();
        expect(token).toBe('abcdabcdabcdabcd');
        expect(token.length).toBeGreaterThanOrEqual(10);
    })
});