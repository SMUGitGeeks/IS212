import React from 'react';
import type { MenuProps } from 'antd';
import {Container} from "react-bootstrap";
import JobList from '../layout/JobList';
import {Row, Col, Space} from 'antd';
import SearchBar from '../layout/SearchBar';



function Home() {
    return (
        <Container>
            {/* Skill Based Role Portal - Home */}
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
                        <JobList />
                    </Col>
                </Row>
            </Space>
        </Container>
    )
}

export default Home;