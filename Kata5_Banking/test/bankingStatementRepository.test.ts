import {StatementRepository} from '../src/statementRepository';
import {Statement} from '../src/statement';
import { BankingStatementRepository } from '../src/bankingStatementReposiotry';

describe('BankingStatementRepository tests', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    it('Should add one statement', () => {
        const repository: StatementRepository = new BankingStatementRepository();
        const statement: Statement = new Statement(new Date('3/15/2035'), 400, 400);
        repository.addStatement(statement);
        expect(repository.getAllStatement()).toEqual([statement]);
    })
})