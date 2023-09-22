import RoleDescription from "../layout/RoleDescription";
import { useParams } from 'react-router-dom';
import { Container } from "react-bootstrap";
import { Row, Col } from "antd";

const RolePage  = () => {
    const { roleListingId } = useParams();

    return (
        <Container>
            {/* <div>
                hi {roleListingId}
            </div> */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify='center' >
                <Col span={20}>
                    <RoleDescription roleListingId={roleListingId}/>
                </Col>
            </Row>
        </Container>
    )
    
}

export default RolePage;