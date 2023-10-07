import {Col, Row, Space} from "antd";
import {Container} from "react-bootstrap";
import HrRoleListings from "../layout/HrRoleListings";

const RoleListingManager = () => {


    return (
        <Container>
            <Space direction="vertical" size={40} style={{width: "100%"}}>
                <div></div>
                <Row justify='center'>
                    <Col span={22}>
                        <HrRoleListings/>
                    </Col>
                </Row>
            </Space>
        </Container>
    );
}

export default RoleListingManager;