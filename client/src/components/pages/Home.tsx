import React from 'react';
import type { MenuProps } from 'antd';
import {Container} from "react-bootstrap";
import JobList from '../layout/JobList';
import { AudioOutlined } from '@ant-design/icons';
import {Row, Col, Input, Space} from 'antd';
import { SearchProps } from 'antd/es/input';

const { Search } = Input;
const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
// const onSearch = (value: String, _e: any) => console.log(value);

function Home() {
    return (
        <Container>
            {/* Skill Based Role Portal - Home */}
            <Space direction="vertical" size={48} style={{ display: 'flex' }}>
                <div></div>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={'center'}>
                    <Col span={22}>
                        <Search placeholder="Search Roles" onSearch={onSearch} />
                    </Col>
                </Row>
                
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify={'center'}>
                    <Col span={5}>
                        Filter
                    </Col>
                    <Col span={17}>
                        <JobList />
                    </Col>
                </Row>
            </Space>
        </Container>
    )
}

export default Home;