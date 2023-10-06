import React from 'react';
import {Row, Col, Avatar, Tooltip} from 'antd';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import { rowGutterStyle } from '../../App';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';




const Navbar = ({auth: {user, loading}}: any) => {
    const location = useLocation()
    const pageName = location.pathname.split("/")[1]
    
    return (
        <Container>
            <Row gutter={rowGutterStyle} align='middle' justify='space-between' style={{width: "100%"}}>
                <Col>
                    <span style={{fontWeight: "bolder", fontSize: "16pt"}}>{
                    pageName === "" ? "Welcome Back!"
                    : pageName[0].toUpperCase() + pageName.substring(1)
                    }
                    </span>
                </Col>
                <Col>
                    <Tooltip title={"User id: " + user}>
                        <Link to={"/profile"}>
                            <Avatar size="large" icon={<UserOutlined />} />
                        </Link>
                    </Tooltip>
                </Col>
                {/* <Col>
                </Col> */}
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
