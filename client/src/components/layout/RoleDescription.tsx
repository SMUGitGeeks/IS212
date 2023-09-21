import { Col, Space, Row, Button, Tooltip, Divider, Descriptions } from "antd";
import { Container } from "react-bootstrap";
import {StarOutlined } from '@ant-design/icons';
import '../styles/RoleDescription.css';
import SkillsCollapsable from "./SkillsCollapsable";
import type { DescriptionsProps } from 'antd';

function RoleDescription(props: any) {
    const { roleListingId } = props;
    // Code to fetch info based on role id

    // Compute skill list for below
    const missingSkills: never[] = [];
    const matchedSkills: never[] = [];

    const importantDetails: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'UserName',
            children: 'Zhou Maomao',
        },
        {
            key: '2',
            label: 'Telephone',
            children: '1810000000',
        },
    ]

    // const importantDetails: DescriptionsProps['items'] = 

    return (
        <Container>
            <Space direction="vertical" style={{ display: 'flex' }} size='large'>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align="middle">
                    <Col span={20}>
                        <div className="">
                            <h1>Role Title</h1>
                            <h3>Department</h3>
                        </div>
                    </Col>
                    <Col span={4}>
                        <Space direction="vertical" align="center" size='large'>
                            <Tooltip title="Add to Favourites">
                                <StarOutlined style={{fontSize: 24}}/>
                            </Tooltip>
                            
                            <Button type="primary">Apply Now</Button>
                        </Space>
                    </Col>
                </Row>

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify='center'>
                    <Col span={18}>
                        Role description
                    </Col>
                    <Col span={6}>
                        <Space direction="vertical">
                            <Descriptions title="User Info" layout="vertical" items={importantDetails} />
                            <Divider />
                            <SkillsCollapsable missingSkills={missingSkills} matchedSkills={matchedSkills} />
                        </Space>
                    </Col>
                </Row>
            </Space>
        </Container>
    )
}

export default RoleDescription;