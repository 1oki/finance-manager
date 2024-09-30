import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionsState } from '../../types';

// interface Transaction {
//   id: string;
// //   type: 'income' | 'expense';
//   type: string;
// //   amount: number;
//   amount: string;
//   category: string;
//   date: string;
// }

const saveToLocalStorage = (transactions: Transaction[]) => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const loadFromLocalStorage = (): Transaction[] => {
  const storedTransactions = localStorage.getItem("transactions");
  return storedTransactions ? JSON.parse(storedTransactions) : [];
};


// interface TransactionsState {
//   transactions: Transaction[];
// }

const initialState: TransactionsState = {
  transactions: loadFromLocalStorage(),
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push({ ...action.payload, id: String(state.transactions.length + 1) });
      saveToLocalStorage(state.transactions);
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      saveToLocalStorage(state.transactions);
    },
  },
});

export const { addTransaction, removeTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
