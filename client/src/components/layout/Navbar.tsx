import React from 'react';
import {Row, Col, Avatar, Tooltip} from 'antd';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import { rowGutterStyle } from '../../App';




const Navbar = ({auth: {user, loading}}: any) => {
    return (
        <Row gutter={rowGutterStyle} align='middle' justify={'end'} style={{width: "100%"}}>
            <Col>
                <Tooltip title={"User id: " + user}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Tooltip>
            </Col>
            <Col>
            </Col>
        </Row>
    )
}


Navbar.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
