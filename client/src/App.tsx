import React, {Fragment, useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Roles from './components/pages/Roles';
import RolePage from "./components/pages/RolePage";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginHR, loginStaff} from "./actions/auth";
import Login from "./components/pages/Login";
import { Layout, MenuProps} from 'antd';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';

const {Header, Footer, Sider, Content} = Layout;

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};

const rowGutterStyle = {xs: 8, sm: 16, md: 24, lg: 32};

const App = ({auth: {user, loading}}:any ) => {

  return (
      user==null ?
          <Fragment>
            <Login />
          </Fragment> :

        <Router>
            <Fragment>
                <Layout style={{minHeight: "100vh"}}>
                  <Sidebar />
                  <Layout>
                    <Header style={{padding: '0px 0px', backgroundColor: "white", width: "100%"}}>
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
  );
}


App.propTypes = {
    loginStaff: PropTypes.func.isRequired,
    loginHR: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});
export default connect(mapStateToProps, {loginStaff, loginHR})(App);

export {rowGutterStyle};