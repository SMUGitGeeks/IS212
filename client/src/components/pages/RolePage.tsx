import RoleDescription from "../layout/RoleDescription";
import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
import { rowGutterStyle } from "../../App";

const RolePage  = () => {

    return (
        <Container>
            <Row gutter={rowGutterStyle} justify='center' >
                <Col span={20}>
                    <RoleDescription  />
                </Col>
            </Row>
        </Container>
    )
    
}

export default RolePage;