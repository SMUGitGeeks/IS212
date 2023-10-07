import React, {useState} from 'react';
import type {MenuProps} from 'antd';
import {Layout, Menu} from 'antd';
import {Link, useLocation} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from '../../actions/auth';
import {HomeOutlined, LogoutOutlined, SearchOutlined} from '@ant-design/icons';

const {Sider} = Layout;

const Sidebar = ({logout, auth: {isHR}}: any) => {
    const location = useLocation()
    const pageName = location.pathname.split("/")[1]

    const items: MenuProps['items'] = [
        {
            label: (<Link to={"/"}>{"Home"}</Link>),
            key: '/',
            icon: <HomeOutlined/>,
        },
        {
            label: (<Link to={"/roleListing"}>{"Search Roles"}</Link>),
            key: 'roleListing',
            icon: <SearchOutlined/>,
        },
        // run logout action
        {
            label: (<Link to={""} onClick={logout}>Logout</Link>),
            key: 'logout',
            icon: <LogoutOutlined/>,
        }
    ];

    if (isHR) {
        items.push({
            label: (<Link to={"/hr"}>{"HR"}</Link>),
            key: '/hr',
            icon: <SearchOutlined/>,
        });
        items.push({
            label: (<Link to={"/staff"}>{"Staff"}</Link>),
            key: 'staff',
            icon: <SearchOutlined/>,
        });
        items.push({
            label: (<Link to={"/listingManage"}>{"Role Listing Management"}</Link>),
            key: 'listingManage',
            icon: <SearchOutlined/>,
        })
    }

    // const onClick: MenuProps['onClick'] = ({ key }) => {
    //     // go to the react route
    //     // code here    
    // }

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <h3 style={{color: "white", marginLeft: "25%"}}>SPRB LOGO</h3>
            <Menu theme="dark" defaultSelectedKeys={pageName === "" ? ["/"] : [pageName]} mode="inline" items={items}/>
        </Sider>
    )
}


Sidebar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Sidebar);
