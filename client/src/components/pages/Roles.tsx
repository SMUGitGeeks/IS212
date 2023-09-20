import React, { Fragment, useEffect } from 'react';
import {Container} from "react-bootstrap";
import { connect } from 'react-redux';
import { getRoles } from '../../actions/role';
import PropTypes from 'prop-types';
import RoleList from '../layout/RoleList';
import {Row, Col, Space} from 'antd';
import SearchBar from '../layout/SearchBar';


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

            {/* Design section */}
            <Space direction="vertical" size={48} style={{ display: 'flex' }}>
                <div></div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={'center'}>
                    <Col span={22}>
                        <SearchBar />
                    </Col>
                </Row>
                
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={'center'}>
                    <Col span={5}>
                        Filter
                    </Col>
                    <Col span={17}>
                        <RoleList />
                    </Col>
                </Row>
            </Space>
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