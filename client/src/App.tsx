import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Roles from './components/pages/Roles';
import { Provider } from 'react-redux';
import store from './store';
import RolePage from './components/pages/RolePage';
import { Layout} from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  padding: '0px 0px',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

const rowGutterStyle = { xs: 8, sm: 16, md: 24, lg: 32 };

function App() {
  return (
      <Provider store={store}>
        <Router>
            <Fragment>
                {/* <Navbar /> */}
                {/*Create route for Home*/}
                {/* <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/roles/:roleListingId" element={<RolePage />} />
                </Routes> */}
                <Layout>
                  <Sider style={siderStyle}>Sider</Sider>
                  <Layout>
                    <Header style={{padding: '0px 0px'}}>
                      <Navbar />
                    </Header>
                    <Content >
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/roles" element={<Roles />} />
                        <Route path="/roles/:roleListingId" element={<RolePage />} />
                      </Routes>
                    </Content>
                    <Footer style={footerStyle}>Footer</Footer>
                  </Layout>
                </Layout>
            </Fragment>
          </Router>
      </Provider>
  );
}

export default App;
export {rowGutterStyle};