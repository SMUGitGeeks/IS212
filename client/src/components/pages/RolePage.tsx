import RoleDescription from "../layout/RoleDescription";
import { useParams } from 'react-router-dom';
import { Container } from "react-bootstrap";
import { Row, Col } from "antd";
import { rowGutterStyle } from "../../App";

const RolePage  = () => {
    const { roleListingId } = useParams();

    return (
        <Container>
            {/* <div>
                hi {roleListingId}
            </div> */}
            <Row gutter={rowGutterStyle} justify='center' >
                <Col span={20}>
                    <RoleDescription  />
                </Col>
            </Row>
        </Container>
    )
    
}

export default RolePage;