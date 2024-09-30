import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTransaction } from "../redux/slices/transactionsSlice";
import { Form as AntForm, Input, Button, Select, DatePicker, Radio } from "antd";
import { Transaction, TransactionsState } from '../types';
import 'antd/dist/reset.css';

// import { Button, Flex, Segmented } from 'antd';
import type { FlexProps, SegmentedProps } from 'antd';

interface FormValues {
  type: 'income' | 'expense';
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
        console.log(values)
        dispatch(addTransaction(values));
        resetForm();
      }}
    >

      {({ setFieldValue, values }) => (
          <AntForm
            layout="vertical"
            style={{
              maxWidth: 600,
              margin: 'auto',
              padding: '30px',
              background: '#f5f5f5',
              borderRadius: '8px',
            }}
          >
            <AntForm.Item label="Transaction Type" name="type">
              <Field name="type">
                {( field : FormValues) => (
                  <Radio.Group
                    {...field}
                    value = {values.type}
                    defaultValue="income"
                    onChange={(e) => setFieldValue("type", e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <Radio value="income">Income</Radio>
                    <Radio value="expense">Expense</Radio>
                  </Radio.Group>
                )}
              </Field>
            </AntForm.Item>

            <AntForm.Item
              label="Amount"
              name="amount"
              help={<ErrorMessage name="amount" component="div" />}
            >
              <Field name="amount">
                {( {field} : FieldProps) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter amount"
                    style={{ padding: '8px', borderRadius: '4px' }}
                  />
                )}
              </Field>
            </AntForm.Item>

            <AntForm.Item
              label="Category"
              name="category"
              help={<ErrorMessage name="category" component="div" />}
            >
              <Field name="category">
                {( {field} : FieldProps) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter category"
                    style={{ padding: '8px', borderRadius: '4px' }}
                  />
                )}
              </Field>
            </AntForm.Item>

            <AntForm.Item
              label="Date"
              name="date"
              help={<ErrorMessage name="date" component="div"  />}
            >
              <Field name="date">
                {( {field} :  FieldProps) => (
                  <DatePicker
                    {...field}
                    onChange={(date, dateString) => setFieldValue("date", dateString)}
                    style={{ width: '100%' }}
                  />
                )}
              </Field>
            </AntForm.Item>

            <AntForm.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: '#4caf50',
                  borderColor: '#4caf50',
                  color: 'white',
                  borderRadius: '5px',
                  padding: '10px 15px',
                  width: '100%',
                }}
              >
                Add Transaction
              </Button>
            </AntForm.Item>
          </AntForm>
      )}
    </Formik>
  );
};


      {/* {() => (
        <Form>
            <div>
              <label htmlFor="type">Transaction Type </label>
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
        </Form>
      )}
    </Formik>
  );
}; */}

export default React.memo(AddTransactionForm);
