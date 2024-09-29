import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTransaction } from "../redux/slices/transactionsSlice";
import { Flex, Radio, Button } from "antd";

// import { Button, Flex, Segmented } from 'antd';
import type { FlexProps, SegmentedProps } from 'antd';

interface Transaction {
    id: string;
  //   type: 'income' | 'expense';
    type: string;
  //   amount: number;
    amount: string;
    category: string;
    date: string;
  }

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};
const fieldStyle: React.CSSProperties = {
  width: '20%',
  height: 30,
  borderRadius: 6,
  border: '1px solid #40a9ff',
  // border: '1px solid red', borderRadius: '4px'
};


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
        // console.log('values',values)
        // console.log('Date.now().toString()',Date.now().toString())
        dispatch(addTransaction(values));
        resetForm();
      }}
    >
      {() => (
        <Form>
          {/* <Flex style={boxStyle} justify="space-around" align="flex-start" vertical> */}
            <div>
              <label htmlFor="type">Transaction Type </label>
              {/* <Field as="select" name="type" >
                <option value="">Income</option>
                <option value="expense">Expense</option>
              </Field> */}
              <Radio.Group block defaultValue="income" optionType="button" buttonStyle="solid" >
                <Radio value="income">Income</Radio>
                <Radio value="expense">Expense</Radio>
              </Radio.Group>
            </div>
            <div>
              <label htmlFor="amount">Amount </label>
              <Field name="amount" type="number" />
              <ErrorMessage name="amount"/>
            </div>
            <div>
              <label htmlFor="category">Category </label>
              <Field name="category" type="text" style={fieldStyle}/>
              <ErrorMessage name="category" />
            </div>
            <div>
              <label htmlFor="date">Date </label>
              <Field name="date" type="date" style={fieldStyle}/>
              <ErrorMessage name="date" />
            </div>
            <div>
              <Button type="primary">Add Transaction</Button>
            </div>
            
          {/* </Flex> */}
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(AddTransactionForm);
