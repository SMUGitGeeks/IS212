import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Roles from './components/pages/Roles';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginHR, loginStaff} from "./actions/auth";
import Login from "./components/pages/Login";



const App = ({auth: {user, loading}}:any ) => {
  return (
      user=="" ?
          <Fragment>
            <Login />
          </Fragment> :

        <Router>
            <Fragment>
                <Navbar />
                <div>Currently logged in as {user}</div>
                {/*Create route for Home*/}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/roles" element={<Roles />} />
                </Routes>
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
export default connect(mapStateToProps, { loginStaff, loginHR })(App);
