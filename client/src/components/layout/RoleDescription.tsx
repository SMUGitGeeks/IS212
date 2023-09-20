import { Container } from "react-bootstrap";


function RoleDescription(props: any) {
    const { roleListingId } = props;
    // Code to fetch info based on role id

    return (
        <Container>
            <div>
                hi {roleListingId}
            </div>
        </Container>
    )
}

export default RoleDescription;