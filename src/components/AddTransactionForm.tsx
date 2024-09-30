import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTransaction } from "../redux/slices/transactionsSlice";
// import { Form as AntForm, Input, Button, Select, DatePicker, Radio } from "antd";
import { Transaction, TransactionsState } from '../types';
// import 'antd/dist/reset.css';

// import { Button, Flex, Segmented } from 'antd';
import type { FlexProps, SegmentedProps } from 'antd';

interface FormValues {
  type: 'income' | 'expense';
  amount: string;
  category: string;
  date: string;
}

const AddTransactionForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    amount: Yup.number().positive("Amount must be positive").required(" Required"),
    category: Yup.string().required(" Required"),
    type: Yup.string().oneOf(["income", "expense"]).required(" Required"),
    date: Yup.date().required(" Required"),
  });


  return (
    <Formik
      initialValues={{ id: "", type: "income", amount: "", category: "", date: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        values.id = Date.now().toString();
        console.log(values)
        dispatch(addTransaction(values));
        resetForm();
      }}
    >

      {({ setFieldValue, values }) => (
          <Form style={formStyle}>
          {/* Тип транзакции */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Transaction Type</label>
            <div role="group" style={radioGroupStyle}>
              <label style={radioLabelStyle}>
                <Field type="radio" name="type" value="income" />
                Income
              </label>
              <label style={radioLabelStyle}>
                <Field type="radio" name="type" value="expense" />
                Expense
              </label>
            </div>
          </div>

          {/* Сумма */}
          <div style={formGroupStyle}>
            <label htmlFor="amount" style={labelStyle}>Amount</label>
            <Field
              name="amount"
              type="number"
              placeholder="Enter amount"
              style={inputStyle}
            />
            <ErrorMessage name="amount">
              {msg => <div style={errorStyle}>{msg}</div>}
            </ErrorMessage>
          </div>

          {/* Категория */}
          <div style={formGroupStyle}>
            <label htmlFor="category" style={labelStyle}>Category</label>
            <Field
              name="category"
              type="text"
              placeholder="Enter category"
              style={inputStyle}
            />
            <ErrorMessage name="category">
              {msg => <div style={errorStyle}>{msg}</div>}
            </ErrorMessage>
          </div>

          {/* Дата */}
          <div style={formGroupStyle}>
            <label htmlFor="date" style={labelStyle}>Date</label>
            <Field
              name="date"
              render={({ field }: FieldProps) => (
                <input
                  {...field}
                  type="date"
                  style={inputStyle}
                  value={values.date}
                  onChange={(e) => setFieldValue("date", e.target.value)}
                />
              )}
            />
            <ErrorMessage name="date">
              {msg => <div style={errorStyle}>{msg}</div>}
            </ErrorMessage>
          </div>

          {/* Кнопка для добавления транзакции */}
          <div style={formGroupStyle}>
            <button type="submit" style={buttonStyle}>
              Add Transaction
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const formStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: 'auto',
  padding: '30px',
  background: '#f5f5f5',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: '15px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const radioGroupStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  margin: '10px 0',
};

const radioLabelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const errorStyle: React.CSSProperties = {
  color: 'red',
  fontSize: '18px',
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#4caf50',
  borderColor: '#4caf50',
  color: 'white',
  borderRadius: '5px',
  padding: '10px 15px',
  fontSize: '16px',
  width: '100%',
  cursor: 'pointer',
  border: 'none',
};

export default React.memo(AddTransactionForm);
