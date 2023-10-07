import React from 'react';
import {Container} from "react-bootstrap";
import RoleList from '../layout/RoleList';
import {Col, Row, Select, Space} from 'antd';
import RoleSearchFilter from '../layout/RoleSearchFilter';
import {useDispatch} from 'react-redux';
import {sortRoleListingsByDate, sortRoleListingsByName, sortRoleListingsBySkillMatch} from '../../actions/roleListings';
import {rowGutterStyle} from '../../App';

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
    {
        value: 'recent',
        label: 'Most Recent'
    },
    {
        value: 'skillmatch',
        label: 'Skill Match'
    }
]

const RoleListing = () => {
    const dispatch = useDispatch();
    const onChange = (value: string) => {
        let direction = value;
        if (direction === 'recent') {
            dispatch(sortRoleListingsByDate({direction}) as any);
        } else if (direction === 'skillmatch') {
            dispatch(sortRoleListingsBySkillMatch({direction}) as any);
        } else {
            dispatch(sortRoleListingsByName({direction}) as any);
        }
    }

    return (
        <Container>
            <Space direction="vertical" size={16} style={{display: 'flex'}}>
                <div style={{marginTop: 20}}></div>
                <Row justify={'end'} gutter={rowGutterStyle}>
                    <Col>
                        <Select
                            style={{width: 200}}
                            placeholder="Sort by"
                            optionFilterProp="children"
                            filterOption={true}
                            options={sortOptions}
                            onChange={onChange}
                        />
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <Row gutter={rowGutterStyle} justify={'center'}>
                    <Col xs={22} sm={22} md={22} lg={6} xl={5}>
                        <RoleSearchFilter/>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={0} xl={0} style={{padding: '20px'}}></Col>
                    <Col xs={22} sm={22} md={22} lg={15} xl={17}>
                        <RoleList/>
                    </Col>
                </Row>
            </Space>
        </Container>
    );
}

export default RoleListing;