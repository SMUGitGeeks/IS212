import RoleDescription from "../layout/RoleDescription";
import {Container} from "react-bootstrap";
import {Col, Row} from "antd";
import {rowGutterStyle} from "../../App";

const ManageRolePage = () => {
    return (
        <Container>
            <Row gutter={rowGutterStyle} justify='center'>
                <Col span={20}>
                    <RoleDescription/>
                </Col>
            </Row>
        </Container>
    )
}

export default ManageRolePage;