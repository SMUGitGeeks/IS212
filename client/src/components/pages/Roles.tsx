import React, { Fragment, useEffect, useState } from 'react';
import {Container} from "react-bootstrap";
import { connect } from 'react-redux';
import { getRoleListings } from '../../actions/roleListings';
import PropTypes from 'prop-types';
import RoleList from '../layout/RoleList';
import {Row, Col, Space, Typography, Button} from 'antd';
import SearchBar from '../layout/SearchBar';
import TagSearchBar from '../layout/TagSearchBar';
import RelatedSelector from '../layout/RelatedSelector';
import SortSelector from '../layout/SortSelector';

const { Title } = Typography;

const Roles = ({ getRoles, roleListing: { roleListings, loading } }: any) => {
    useEffect(() => {
        getRoleListings();
    }, [getRoleListings]);
    
    const roleType: String[] = []; //to be added in
    // const locations: String[] = []; //to be added in

    const filter = () => {
        // code to confirm filter options and filter
    }

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
                        <Space direction='vertical' size="small">
                            <Title level={4}>Filters</Title>
                            <Title level={5}>Role Type</Title>
                            <TagSearchBar />
                            
                            <Title level={5}>Location</Title>
                            <RelatedSelector />
                            <Button onClick={filter}>Filter Results</Button>
                        </Space>
                    </Col>
                    <Col span={17}>
                        <SortSelector />
                        <RoleList />
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