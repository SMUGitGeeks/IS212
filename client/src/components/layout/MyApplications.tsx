import { Container } from "react-bootstrap";
import RoleList from "./RoleList";

// const data = [];

function MyApplications() {
    return (
        <Container>
            applications
            <RoleList />
            {/* <RoleList roles={data}/> */}
        </Container>
    )
}

export default MyApplications;