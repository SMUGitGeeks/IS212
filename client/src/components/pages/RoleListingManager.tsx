import { Col, Row, Select, Space } from "antd";
import { Container } from "react-bootstrap";
import HrRoleListings from "../layout/HrRoleListings";

const options = [
    {
        value: '1',
        label: 'Not Identified',
    },
    {
        value: '2',
        label: 'Closed',
    },
    {
        value: '3',
        label: 'Communicated',
    },
    {
        value: '4',
        label: 'Identified',
    },
    {
        value: '5',
        label: 'Resolved',
    },
    {
        value: '6',
        label: 'Cancelled',
    },
];
    

const RoleListingManager = () => {


    return (
        <Container>
            <Space direction="vertical" size={40} style={{width: "100%"}}>
                <div></div>
                {/* <Row justify='center'>
                    <Col span={20}>
                        <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={options}
                    />
                    </Col>
                </Row> */}
                <Row justify='center'>
                    <Col span={22}>
                        <HrRoleListings />
                    </Col>
                </Row>
            </Space>
        </Container>
    );
}

export default RoleListingManager;