import React, { useEffect, useState } from 'react';
import {Avatar, Button, Col, Drawer, Menu, MenuProps, Row, Tooltip} from 'antd';
import PropTypes from "prop-types";
import {connect, useDispatch} from "react-redux";
import {UserOutlined} from '@ant-design/icons';
import {rowGutterStyle} from '../../App';
import {Link, useLocation} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {MenuOutlined} from '@ant-design/icons';
import {HomeOutlined, SearchOutlined, AuditOutlined, LogoutOutlined, CloseOutlined} from '@ant-design/icons';
import {filterRoleListingsByDepartment, filterRoleListingsByLocation, filterRoleListingsByRoleId} from '../../actions/roleListings';

interface pageType {
    [key: string]: string
}

const pages: pageType = {
    "": "Welcome Back!",
    "roleListing": "Search Roles",
    "listingManage": "Role Listing Management",
    "profile": "Profile",
    "staff": "Staff Detail",
}

const Navbar = ({auth: {user, loading, isHR, logout}}: any) => {
    const location = useLocation()
    const pageName = location.pathname.split("/")[1]
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Update viewport width when the window is resized
    useEffect(() => {
        function handleResize() {
        setViewportWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const items: MenuProps['items'] = [
        // {
        //     label: "SBRP",
        //     key: 'logo',
        //     disabled: true,
        //     style: {height: 60, paddingTop: 10, cursor: "default"},
        // },
        {
            label: (<Link to={"/"}>{"Home"}</Link>),
            key: '/',
            icon: <HomeOutlined/>,
            style: {height: 60, paddingTop: 10},
        },
        {
            label: 
                <Link to={"/profile"}>
                    My Profile
                </Link>
            ,
            key: 'profile',
            icon: <UserOutlined/>,
            style: {height: 60, paddingTop: 10},

        },
        {
            label: (<Link to={"/roleListing"}>{"Search Roles"}</Link>),
            key: 'roleListing',
            icon: <SearchOutlined/>,
            onClick: () => {
                dispatch(filterRoleListingsByRoleId({roleIds: []}) as any);
                dispatch(filterRoleListingsByDepartment({departments: []}) as any);
                dispatch(filterRoleListingsByLocation({locations: []}) as any);
            },
            style: {height: 60, paddingTop: 10},
        }
    ];

    if (isHR) {
        items.push({
            label: (<Link to={"/listingManage"}>{"Role Listing Management"}</Link>),
            key: 'listingManage',
            icon: <AuditOutlined/>,
            style: {height: 60, paddingTop: 10},
        })
    }

    items.push({
        label: (<Link to={""} onClick={logout}>Logout</Link>),
        key: 'logout',
        danger: true,
        icon: <LogoutOutlined/>,
        style: {height: 60, paddingTop: 10},
    })

    return (
        <Container>
            <Drawer
                title={<div style={{color: "white"}}>SBRP</div>}
                placement={"top"}
                closable={false}
                onClose={onClose}
                open={open}
                // style={{padding: 0}}
                // contentWrapperStyle={{padding: 0}}
                bodyStyle={{padding: 0}}
                style={{backgroundColor: "#001529"}}
                extra={
                    <Button icon={<CloseOutlined style={{color: "white"}}/>} type="text" onClick={() => setOpen(false)}/>
                }
            >
                <Menu 
                    theme='dark' 
                    defaultSelectedKeys={pageName === "" ? ["/"] : [pageName]} 
                    items={items} 
                    title='SBRP' 
                    style={{textAlign:"center", height: "100%", fontSize: "14pt"}} 
                    mode='vertical'
                    onSelect={() => setOpen(false)}
                />
            </Drawer>
            <Row gutter={rowGutterStyle} align='middle' justify='space-between' style={{width: "100%"}}>
                <Col>
                    <span style={{fontWeight: "bolder", fontSize: "16pt"}}>
                        {pages[pageName]}
                    </span>
                </Col>
                <Col>
                    <Row>
                        <Col>
                        {   // Only show the menu button if the screen is medium or smaller
                            viewportWidth <= 992 ?
                            <Button icon={<MenuOutlined />} type="text" onClick={() => setOpen(true)}/> : 
                            <Tooltip title={"User id: " + user}>
                                <Link to={"/profile"}>
                                    <Avatar size="large" icon={<UserOutlined/>}/>
                                </Link>
                            </Tooltip>
                        }
                        </Col>
                        
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
