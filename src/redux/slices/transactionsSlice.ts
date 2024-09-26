import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id?: string;
//   type: 'income' | 'expense';
  type: string;
//   amount: number;
  amount: string;
  category: string;
  date: string;
}

interface TransactionsState {
  transactions: Transaction[];
}

const initialState: TransactionsState = {
  transactions: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push({ ...action.payload, id: String(state.transactions.length + 1) });
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTransaction, removeTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
