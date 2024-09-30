import React from "react";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import Charts from "./components/Charts";

import { Flex, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 90,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
  // padding: "10px",
};

const contentStyle: React.CSSProperties = {
  paddingLeft: 20,
  paddingRight: 20,
  textAlign: 'left',
  minHeight: 120,
  lineHeight: '60px',
  color: '#fff',
  backgroundColor: '#0958d9',
  fontSize: 20,
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
};

const App: React.FC = () => (
  <div>
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <h1>Personal Finance Manager</h1>       
      </Header>
      <Content style={contentStyle}>
        <AddTransactionForm />
        <TransactionList />
        {/* <Charts /> */}
      </Content>
    </Layout>
  </div>
);

export default App;

