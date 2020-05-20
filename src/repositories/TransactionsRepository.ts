import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    /* Calculate balance */
    const incomeSoma = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((act, t) => act + t.value, 0);
    const outcomeSoma = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((act, t) => act + t.value, 0);

    const result = incomeSoma - outcomeSoma;

    return {
      income: incomeSoma,
      outcome: outcomeSoma,
      total: result,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
