import { Col, Space, Row, Button, Tooltip, Divider, Descriptions, Collapse, Tag, Typography } from "antd";
import { Container } from "react-bootstrap";
import {StarOutlined } from '@ant-design/icons';
import type { CollapseProps, DescriptionsProps } from 'antd';
import { rowGutterStyle } from '../../App';

const { Title } = Typography;

function RoleDescription(props: any) {
    const { roleListingId } = props;
    // Code to fetch info based on role id

    // Role Skills =======================
    // Sample data:
    const roleSkills: String[] = [
        "Fishing",
        "Lorry",
        "cars"
    ];

    // Skills Matching ===================
    const missingSkills: String[] = [
        "Fishing",
        "cars"
    ];
    const matchedSkills: String[] = [
        "Lorry"
    ]
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Skills Matched',
            children: (matchedSkills.map((skill: any) => (
                <Tag>{skill}</Tag>
            ))),
        },
        {
            key: '2',
            label: 'Skills Missing',
            children: (missingSkills.map((skill: any) => (
                <Tag>{skill}</Tag>
            ))),
        },
    ];
    const onChange = (key: string | string[]) => {
        // console.log(key);
    };
    // ===================================


    // Important Details =================
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
    // ===================================

    return (
        <Container>
            <Space direction="vertical" style={{ display: 'flex' }} size='large'>
                <Row gutter={rowGutterStyle} align="middle">
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

                <Row gutter={rowGutterStyle} justify='center'>
                    <Col span={18}>
                        Role description
                    </Col>
                    <Col span={6}>
                        <Space direction="vertical">
                            <Descriptions title="User Info" layout="vertical" items={importantDetails} />
                            <Divider />
                            {/* Display Role's skills */}
                            <Title level={5}>All Skills</Title>
                            <Space size={[0, 8]} wrap>
                                {roleSkills.map((skill: any) => (
                                    <Tag>{skill}</Tag>
                                ))}
                            </Space>
                            
                            {/* Separated into skills match vs missing */}
                            {/* <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} /> */}
                        </Space>
                    </Col>
                </Row>
                <Row gutter={rowGutterStyle} justify='center'>
                    hi
                </Row>
            </Space>
        </Container>
    )
}

export default RoleDescription;