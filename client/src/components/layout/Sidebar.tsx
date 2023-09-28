import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import {Avatar, Button, Layout, Menu} from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { logout } from '../../actions/auth';
import { LogoutOutlined, HomeOutlined, SearchOutlined} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ logout }: any) => {
    const items: MenuProps['items'] = [
        {
            label: (<Link to={"/"}>{"Home"}</Link>),
            key: '/',
            icon: <HomeOutlined />,
        },
        {
            label: (<Link to={"/roles"}>{"Search Roles"}</Link>),
            key: '/roles',
            icon: <SearchOutlined />,
        },
        // run logout action
        {
            label: (<Link to={""} onClick={logout} >Logout</Link>),
            key: 'logout',
            icon: <LogoutOutlined />,
        }
    ];
    // const onClick: MenuProps['onClick'] = ({ key }) => {
    //     // go to the react route
    //     // code here    
    // }

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <h3 style={{color: "white", marginLeft: "25%"}}>SPRB LOGO</h3>
            <Menu theme="dark" defaultSelectedKeys={['/']} mode="inline" items={items} />
        </Sider>
    )
}


Sidebar.propTypes = {
    logout: PropTypes.func.isRequired,
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Sidebar);
