import React, {useState} from 'react';
import type {MenuProps} from 'antd';
import {Layout, Menu} from 'antd';
import {Link, useLocation} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logout} from '../../actions/auth';
import {AuditOutlined, HomeOutlined, LogoutOutlined, SearchOutlined, MenuOutlined} from '@ant-design/icons';

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
        }
    ];

    if (isHR) {
        items.push({
            label: (<Link to={"/listingManage"}>{"Role Listing Management"}</Link>),
            key: 'listingManage',
            icon: <AuditOutlined/>,
        })
    }

    items.push({
        label: (<Link to={""} onClick={logout}>Logout</Link>),
        key: 'logout',
        danger: true,
        icon: <LogoutOutlined/>,
    })
    const [collapsed, setCollapsed] = useState(false);
    const [triggerStyle, setTriggerStyle] = useState({ top: 0, bottom: 'auto', left: 8, backgroundColor: 'white', height: 64, width: 50} as any)
    return (
        <Sider 
            collapsible 
            collapsed={collapsed}
            onCollapse={(value) => {
                setCollapsed(value)
                if (!value) {
                    setTriggerStyle({top: 0, bottom: 'auto', left: 200,backgroundColor: 'white', height: 64, width: 50 })
                } else {
                    setTriggerStyle({top: 0, bottom: 'auto', left: 8, backgroundColor: 'white', height: 64, width: 50})
                }
                // console.log(value)
            }}
            trigger={<MenuOutlined style={{color: "black", fontSize: 25}}/>}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                if (!broken) {
                    setCollapsed(true);
                    setTriggerStyle({top: 0, bottom: 'auto', left: 200,backgroundColor: 'white', height: 64, width: 50 })
                }
            // console.log(broken);
            }}
            zeroWidthTriggerStyle={triggerStyle}
            // zeroWidthTriggerStyle={{top: 0, bottom: 'auto', left: 8, backgroundColor: 'white', height: 68}}
        >
            <h3 style={{color: "white", textAlign: "center"}}>SPRB</h3>
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
