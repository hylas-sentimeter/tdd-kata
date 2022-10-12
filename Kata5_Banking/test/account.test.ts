import {BankingAccount} from '../src/account';
import {StatementRepository} from '../src/statementRepository';
import {Statement} from '../src/statement';

describe('Account tests', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Should print header of statement', () => {
        const spyOn = jest.spyOn(console, 'log');
        const statementRepository: StatementRepository = new class implements StatementRepository {
            addStatement(statement: Statement): void {
            }

            getAllStatement(): Statement[] {
                return [];
            }
        };
        const account = new BankingAccount(statementRepository);
        account.printStatement();
        expect(spyOn).toBeCalledWith('Date\t\tAmount\t\tBalance');
    });
    it('Should print header and one deposit statement', () => {
        const spyOn = jest.spyOn(console, 'log');
        const statement: Statement = new Statement(new Date('3/15/2025'), 400, 400);
        const statementRepository: StatementRepository = new class implements StatementRepository {
            addStatement(statement: Statement): void {
            }

            getAllStatement(): Statement[] {
                return [statement];
            }
        };
        const account = new BankingAccount(statementRepository);
        account.deposit(400);
        account.printStatement();
        expect(spyOn).toBeCalledTimes(2);
        expect(spyOn).nthCalledWith(1, 'Date\t\tAmount\t\tBalance');
        expect(spyOn).nthCalledWith(2, '15.03.2025\t\t+400\t\t400');
    });
    it('Should print header and one withdraw statement', () => {
        const spyOn = jest.spyOn(console, 'log');
        const statement: Statement = new Statement(new Date('11/15/2035'), -400, -400);
        const statementRepository: StatementRepository = new class implements StatementRepository {
            addStatement(statement: Statement): void {
            }

            getAllStatement(): Statement[] {
                return [statement];
            }
        };
        const account = new BankingAccount(statementRepository);
        account.withdraw(400);
        account.printStatement();
        expect(spyOn).toBeCalledTimes(2);
        expect(spyOn).nthCalledWith(1, 'Date\t\tAmount\t\tBalance');
        expect(spyOn).nthCalledWith(2, '15.11.2035\t\t-400\t\t-400');
    });
    it('Should print header and two transaction statement', () => {
        const spyOn = jest.spyOn(console, 'log');
        const statement1: Statement = new Statement(new Date('3/15/2025'), 400, 400);
        const statement2: Statement = new Statement(new Date('11/15/2035'), -1100, 1300);
        const statementRepository: StatementRepository = new class implements StatementRepository {
            addStatement(statement: Statement): void {
            }

            getAllStatement(): Statement[] {
                return [statement1, statement2];
            }
        };
        const account = new BankingAccount(statementRepository);
        account.deposit(400);
        account.withdraw(1100);
        account.printStatement();
        expect(spyOn).toBeCalledTimes(3);
        expect(spyOn).nthCalledWith(1, 'Date\t\tAmount\t\tBalance');
        expect(spyOn).nthCalledWith(2, '15.03.2025\t\t+400\t\t400');
        expect(spyOn).nthCalledWith(3, '15.11.2035\t\t-1100\t\t1300');
    });
});
