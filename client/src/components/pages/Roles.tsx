import React, { Fragment, useEffect } from 'react';
import {Container} from "react-bootstrap";
import { connect } from 'react-redux';
import { getRoles } from '../../actions/role';
import PropTypes from 'prop-types';
import ApplicationBar from '../layout/ApplicationBar';


const Roles = ({ getRoles, role: { roles, loading } }: any) => {
    useEffect(() => {
        getRoles();
    }, [getRoles]);

    return loading ?
        <Container> Loading </Container> :
        <Container>
            {roles.map((role: any)=> (
                <div> {role.rl_desc} </div>
                ))}
            <ApplicationBar />
        </Container>

}

Roles.propTypes = {
    getRoles: PropTypes.func.isRequired,
    role: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    role: state.role
});
export default connect(mapStateToProps, { getRoles })(Roles);