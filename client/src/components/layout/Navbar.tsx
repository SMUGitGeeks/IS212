import React from 'react';
import type { MenuProps } from 'antd';
import {Button, Menu} from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { logout } from '../../actions/auth';




const Navbar = ({ logout }: any) => {
    const items: MenuProps['items'] = [
        {
            label: (<Link to={"/"}>{"Home"}</Link>),
            key: '/',
            icon: '',
        },
        {
            label: (<Link to={"/roles"}>{"Roles"}</Link>),
            key: '/roles',
            icon: '',
        },
        // run logout action
        {
            label: (<Button onClick={logout}>Logout</Button>),
            key: 'logout',
            icon: '',
        }
    ];
    const onClick: MenuProps['onClick'] = ({ key }) => {
        // go to the react route
        // code here
    }
    return (
        <Menu items={items} mode="horizontal" />
    )
}


Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
