import React, {useState} from 'react';
import type {MenuProps} from 'antd';
import {Layout, Menu} from 'antd';
import {Link, useLocation} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect, useDispatch} from "react-redux";
import {logout} from '../../actions/auth';
import {AuditOutlined, HomeOutlined, LogoutOutlined, SearchOutlined, LeftOutlined, RightOutlined} from '@ant-design/icons';
import { filterRoleListingsByDepartment, filterRoleListingsByLocation, filterRoleListingsByRoleId } from '../../actions/roleListings';

const {Sider} = Layout;

const Sidebar = ({logout, auth: {isHR}}: any) => {
    const location = useLocation()
    const dispatch = useDispatch();
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
            onClick: () => {
                dispatch(filterRoleListingsByRoleId({roleIds: []}) as any);
                dispatch(filterRoleListingsByDepartment({departments: []}) as any);
                dispatch(filterRoleListingsByLocation({locations: []}) as any);
            }
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
    const [trigger, setTrigger] = useState(null as any)
    const [collapsedWidth, setCollapsedWidth] = useState(80)
    return (
        <Sider 
            collapsible 
            collapsed={collapsed}
            onCollapse={(value) => {
                setCollapsed(value)
                if (value) {
                    setTrigger(<RightOutlined />)
                } else {
                    setTrigger(<LeftOutlined />)
                }
            }}
            trigger={collapsedWidth !== 0 ? trigger : null}
            breakpoint="lg"
            collapsedWidth={collapsedWidth}
            onBreakpoint={(broken) => {
                if (!broken) {
                    setCollapsedWidth(80)
                } else {
                    setCollapsedWidth(0)
                }
            }}
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