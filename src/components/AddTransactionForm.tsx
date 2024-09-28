import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTransaction } from "../redux/slices/transactionsSlice";

interface Transaction {
    id: string;
  //   type: 'income' | 'expense';
    type: string;
  //   amount: number;
    amount: string;
    category: string;
    date: string;
  }


const AddTransactionForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    amount: Yup.number().positive("Amount must be positive").required("Required"),
    category: Yup.string().required("Required"),
    type: Yup.string().oneOf(["income", "expense"]).required("Required"),
    date: Yup.date().required("Required"),
  });

  return (
    <Formik
      initialValues={{ id: "", type: "income", amount: "", category: "", date: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        values.id = Date.now().toString();
        // console.log('values',values)
        // console.log('Date.now().toString()',Date.now().toString())
        dispatch(addTransaction(values));
        resetForm();
      }}
    >
      {() => (
        <Form>
          <div>
            <label htmlFor="type">Transaction Type</label>
            <Field as="select" name="type">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Field>
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <Field name="amount" type="number" />
            <ErrorMessage name="amount" />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <Field name="category" type="text" />
            <ErrorMessage name="category" />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <Field name="date" type="date" />
            <ErrorMessage name="date" />
          </div>
          <button type="submit">Add Transaction</button>
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(AddTransactionForm);
