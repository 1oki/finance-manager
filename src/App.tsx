import React from "react";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import Charts from "./components/Charts";

const App = () => {
  return (
    <div>
      <h1>Personal Finance Manager</h1>
      <AddTransactionForm />
      <TransactionList />
      <Charts />
    </div>
  );
};

export default App;
