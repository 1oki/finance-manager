export interface Transaction {
    id: string;
  //   type: 'income' | 'expense';
    type: string;
  //   amount: number;
    amount: string;
    category: string;
    date: string;
  }

export  interface TransactionsState {
    transactions: Transaction[];
  }
  