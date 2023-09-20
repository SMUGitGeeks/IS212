import React from 'react';
import {Container} from "react-bootstrap";
import ApplicationBar from '../layout/ApplicationBar';
import { Routes, Route, useLocation, Router } from 'react-router-dom';


function Home() {
    const location = useLocation();
    console.log(location)
    return (
        <Container>
            <ApplicationBar />
            {/* Skill Based Role Portal - Home */}
        </Container>
    )
}

export default Home;