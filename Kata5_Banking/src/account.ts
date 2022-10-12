import {Statement} from './statement';
import {StatementRepository} from './statementRepository';

interface Account {
    deposit(amount: number): void;

    withdraw(amount: number): void;

    printStatement(): void;
}



export class BankingAccount implements Account {
    balance: number = 0;

    constructor(private statementRepository: StatementRepository) {
    }

    deposit(amount: number): void {
        this.balance += amount;
        const statement = new Statement(new Date(), amount, this.balance);
        this.statementRepository.addStatement(statement);
    }

    printStatement(): void {
        console.log('Date\t\tAmount\t\tBalance');
        for (const statement of this.statementRepository.getAllStatement()) {
            console.log(statement.toString());
        }
    }

    withdraw(amount: number): void {
    }

}