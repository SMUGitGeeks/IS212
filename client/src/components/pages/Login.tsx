import React, { Fragment, useEffect } from 'react';
import {Container} from "react-bootstrap";
import { connect } from 'react-redux';
import { loginStaff, loginHR } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Button } from 'antd';


const Login = ({ loginStaff, loginHR, auth: {user, loading}}:any ) => {

    return (
        <Container>
            <Button type="primary" onClick={loginStaff}>Staff Login</Button>
            <Button type="primary" onClick={loginHR}>Login as HR</Button>
        </Container>
    )

}

Login.propTypes = {
    loginHR: PropTypes.func.isRequired,
    loginStaff: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});
export default connect(mapStateToProps, { loginHR, loginStaff })(Login);