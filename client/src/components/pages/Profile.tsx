import React from 'react';
import { Container } from 'react-bootstrap';
import ProfileSkills from '../layout/ProfileSkills';
import { Col, Row } from 'antd';

const Profile = () => {
    return (
        <Container>
            <Row justify='center'>
                <Col span={16}>
                    <ProfileSkills />
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;