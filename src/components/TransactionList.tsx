import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { removeTransaction } from "../redux/slices/transactionsSlice";

const TransactionList = () => {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.type} | {transaction.amount} | {transaction.category} | {transaction.date}
            {/* <button onClick={() => dispatch(removeTransaction(transaction.id))}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(TransactionList);
