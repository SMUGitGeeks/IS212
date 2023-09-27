import React from 'react';
import {Container} from "react-bootstrap";
import Favourties from '../layout/Favourites';
import MyApplications from '../layout/MyApplications';
import { Tabs, TabsProps } from 'antd';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: 'applications',
        label: 'My Applications',
        children: (<MyApplications />),
    },
    {
        key: 'favourites',
        label: 'Favourites',
        children: (<Favourties />),
    },
];

const Home = () => {
    return (
        <Container>
            <Tabs defaultActiveKey="applications" items={items} onChange={onChange} />
            {/* Skill Based Role Portal - Home */}
        </Container>
    )
}

export default Home;