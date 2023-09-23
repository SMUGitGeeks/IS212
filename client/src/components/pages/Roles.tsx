import React, { Fragment, useEffect, useState } from 'react';
import {Container} from "react-bootstrap";
import { connect } from 'react-redux';
import { getRoleListings } from '../../actions/roleListings';
import PropTypes from 'prop-types';
import RoleList from '../layout/RoleList';
import {Row, Col, Space} from 'antd';
import SearchBar from '../layout/SearchBar';
import RoleSearchFilter from '../layout/RoleSearchFilter';

const Roles = ({ getRoles, roleListing: { roleListings, loading } }: any) => {
    useEffect(() => {
        getRoleListings();
    }, [getRoleListings]);
    

    return loading ?
        <Container> Loading </Container> :
        <Container>
            {/* {roles.map((role: any)=> (
                <div> {role.rl_desc} </div>
                ))} */}

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
                        <RoleSearchFilter />
                    </Col>
                    <Col span={17}>
                        <RoleList />
                        {/* <RoleList search='' setSearch={setSearch} handleChangeSearch={handleChangeSearch} /> */}
                    </Col>
                </Row>
            </Space>
        </Container>

}

Roles.propTypes = {
    getRoleListings: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    roleListing: state.roleListing
});
export default connect(mapStateToProps, { getRoleListings })(Roles);