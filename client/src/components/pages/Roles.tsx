import React, { Fragment, useEffect, useState } from 'react';
import {Container} from "react-bootstrap";
import { connect } from 'react-redux';
import { getRoles } from '../../actions/role';
import PropTypes from 'prop-types';
import RoleList from '../layout/RoleList';
import {Row, Col, Space, Typography} from 'antd';
import SearchBar from '../layout/SearchBar';
import TagSearchBar from '../layout/TagSearchBar';
import RelatedSelector from '../layout/RelatedSelector';
import SortSelector from '../layout/SortSelector';

const { Title } = Typography;

const Roles = ({ getRoles, role: { roles, loading } }: any) => {
    useEffect(() => {
        getRoles();
    }, [getRoles]);

    const [filteredRoles, setFilteredRoles] = useState({}); //to get list of roles (or role list id first)
    const onRolesFiltered = (input: []) => {
        setFilteredRoles(input);
    }

    const roleType: String[] = []; //to be added in
    const locations: String[] = []; //to be added in

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
                        <SearchBar data={filteredRoles}/>
                    </Col>
                </Row>
                
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={'center'}>
                    <Col span={5}>
                        <Space direction='vertical' size="small">
                            <Title level={4}>Filters</Title>
                            <Title level={5}>Role Type</Title>
                            <TagSearchBar list={roleType} onFilter={onRolesFiltered}/>
                            
                            <Title level={5}>Location</Title>
                            <RelatedSelector list={locations} onFilter={onRolesFiltered}/>
                        </Space>
                    </Col>
                    <Col span={17}>
                        <SortSelector onSorted={onRolesFiltered}/>
                        <RoleList data={filteredRoles}/>
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