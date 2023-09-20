import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
        label: (<Link to={"/roles"}>{"My Applications"}</Link>),
        key: '/roles',
        icon: '',
    },
    {
        label: (<Link to={"/roles"}>{"Favourties"}</Link>),
        key: '/roles',
        icon: '',
    },
];

function ApplicationBar() {
    const onClick: MenuProps['onClick'] = ({ key }) => {
        // go to the react route
        // code here
    }
    return (
        <Menu items={items} mode="horizontal" />
    )
}

export default ApplicationBar;