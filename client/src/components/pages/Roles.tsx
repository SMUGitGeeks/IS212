import React from 'react';
import {Container} from "react-bootstrap";
import RoleList from '../layout/RoleList';
import {Row, Col, Space, Select} from 'antd';
import SearchBar from '../layout/SearchBar';
import RoleSearchFilter from '../layout/RoleSearchFilter';
import { useDispatch } from 'react-redux';
import { sortRoleListingsByName } from '../../actions/roleListings';

interface filterOption {
    value: string;
    label: string;
}

// Sort Example:
const sortOptions: filterOption[] = [
    {
        value: 'asc',
        label: 'A-Z'
    },
    {
        value: 'desc',
        label: 'Z-A'
    },
]

const Roles = () => {

    const dispatch = useDispatch();

    const onChange = (value: string) => {
        console.log(value)
        let direction = value;
        dispatch(sortRoleListingsByName({direction}) as any);
        dispatch(sortRoleListingsByName({direction}) as any);
    }

    return (
        <Container>
            <Space direction="vertical" size={48} style={{ display: 'flex' }}>
                <div></div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={'center'}>
                    <Col span={22}>
                        <SearchBar />
                    </Col>
                </Row>
                
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={'center'}>
                    <Col xs={22} sm={22} md={22} lg={6} xl={5}>
                        <RoleSearchFilter />
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={0} xl={0} style={{padding:'20px'}}></Col>
                    <Col xs={22} sm={22} md={22} lg={15} xl={17}>
                        <Select
                            style={{ width: 200 }}
                            placeholder="Sort by"
                            // defaultValue={'default'}
                            optionFilterProp="children"
                            filterOption={true}
                            options={sortOptions}
                            onChange={onChange}
                        />
                        <RoleList />
                    </Col>
                </Row>
            </Space>
        </Container>
    );
}

export default Roles;