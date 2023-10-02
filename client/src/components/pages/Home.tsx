import React from 'react';
import {Container} from "react-bootstrap";
import MyApplications from '../layout/MyApplications';
import HrRoleListings from '../layout/HrRoleListings';

const Home = () => {
    return (
        <Container>
            {/* Skill Based Role Portal - Home */}
            <MyApplications />
            <HrRoleListings />
        </Container>
    )
}

export default Home;