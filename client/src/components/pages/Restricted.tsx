import React from 'react';
import {Container} from 'react-bootstrap';

const Restricted = () => {
    return (
        <Container>
            <h1 style={{textAlign: 'center'}}>HR Only</h1>
            <img src={'Restricted.png'} alt="Restricted" style={{margin: 'auto', display: 'block'}}/>
            <h2 style={{textAlign: 'center'}}>You are not authorized to view this page</h2>
        </Container>
    );
};

export default Restricted;