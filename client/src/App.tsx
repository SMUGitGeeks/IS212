import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import RoleListing from './components/pages/RoleListing';
import RolePage from "./components/pages/RolePage";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginHR, loginStaff} from "./actions/auth";
import Login from "./components/pages/Login";
import {Layout} from 'antd';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import {getStaffSkillsByStaffId} from "./actions/staffSkills";
import {getApplicationsByStaffId} from "./actions/applications";
import Profile from './components/pages/Profile';
import Restricted from "./components/pages/Restricted";
import HR from "./components/pages/HR";
import RoleApplicants from './components/pages/RoleApplicants';
import StaffDetail from './components/pages/StaffDetail';
import RoleListingManager from './components/pages/RoleListingManager';
import UpdateRoleListing from './components/pages/UpdateRoleListing';
import ManageRolePage from './components/pages/ManageRolePage';

const {Header, Footer, Sider, Content} = Layout;

const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};

const rowGutterStyle = {xs: 8, sm: 16, md: 24, lg: 32};

const App = ({getStaffSkillsByStaffId, getApplicationsByStaffId, auth: {user, isHR, loading}}: any) => {
    useEffect(() => {
        if (!loading && user) {
            getStaffSkillsByStaffId(user);
            getApplicationsByStaffId(user);
        }
    }, [getStaffSkillsByStaffId, getApplicationsByStaffId, user, loading]);
    return (
        user == null ?
            <Fragment>
                <Login/>
            </Fragment> :

            <Router>
                <Fragment>
                    <Layout style={{minHeight: "100vh"}}>
                        <Sidebar/>
                        <Layout>
                            <Header style={{padding: '0px 0px', backgroundColor: "white", width: "100%"}}>
                                <Navbar/>
                            </Header>
                            <Content>{
                                isHR ? (
                                    <Routes>
                                        <Route path="/" element={<Home/>}/>
                                        <Route path="/roleListing" element={<RoleListing/>}/>
                                        <Route path="/roleListing/:rl_id" element={<RolePage/>}/>
                                        <Route path="/profile" element={<Profile/>}/>
                                        <Route path="/hr" element={<HR/>}/>
                                        <Route path="/role/:roleListingId/applicants" element={<RoleApplicants/>}/>
                                        <Route path="/staff/:staffId" element={<StaffDetail/>}/>
                                        <Route path="/listingManage" element={<RoleListingManager/>}/>
                                        <Route path="/listingManage/update/:rl_id" element={<UpdateRoleListing/>}/>
                                        <Route path="/listingManage/:rl_id" element={<ManageRolePage/>}/>
                                    </Routes>
                                ) : (
                                    <Routes>
                                        <Route path="/" element={<Home/>}/>
                                        <Route path="/roleListing" element={<RoleListing/>}/>
                                        <Route path="/roleListing/:rl_id" element={<RolePage/>}/>
                                        <Route path="/profile" element={<Profile/>}/>
                                        <Route path="/hr" element={<Restricted/>}/>
                                        <Route path="/role/:roleListingId/applicants" element={<Restricted/>}/>
                                        <Route path="/staff/:staffId" element={<Restricted/>}/>
                                        <Route path="/listingManage" element={<Restricted/>}/>
                                        <Route path="/listingManage/update/:rl_id" element={<Restricted/>}/>
                                        <Route path="/listingManage/:rl_id" element={<Restricted/>}/>
                                    </Routes>
                                )}
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
    auth: PropTypes.object.isRequired,
    getStaffSkillsByStaffId: PropTypes.func.isRequired,
    getApplicationsByStaffId: PropTypes.func.isRequired,
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});
export default connect(mapStateToProps, {loginHR, loginStaff, getStaffSkillsByStaffId, getApplicationsByStaffId})(App);

export {rowGutterStyle};