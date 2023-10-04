import React from 'react';
import {Container} from "react-bootstrap";
import StaffList from '../layout/StaffList';
import {Col, Row, Select, Space, Typography} from 'antd';
import {useDispatch} from 'react-redux';
import {rowGutterStyle} from '../../App';

const {Title} = Typography;

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

const Staff = () => {

    const dispatch = useDispatch();
    const onChange = (value: string) => {

    }


    return (
        <Container>
            <Space direction="vertical" size={16} style={{display: 'flex'}}>
                {/* <Title level={2}>Search Roles</Title> */}
                <div style={{marginTop: 20}}></div>
                <Row justify={'end'} gutter={rowGutterStyle}>
                    <Col>
                        <Select
                            style={{width: 200}}
                            placeholder="Sort by"
                            // defaultValue={'default'}
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
                        <div>Staff Search Filter Here</div>
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={0} xl={0} style={{padding: '20px'}}></Col>
                    <Col xs={22} sm={22} md={22} lg={15} xl={17}>

                        <StaffList/>
                    </Col>
                </Row>
            </Space>
        </Container>
    );
}

export default Staff;