import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import MyApplications from './MyApplications';
import Favourties from './Favourites';

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

function ApplicationBar() {
    return (
        <Tabs defaultActiveKey="applications" items={items} onChange={onChange} />
    )
}

export default ApplicationBar;