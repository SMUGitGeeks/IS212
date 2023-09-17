import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
    {
        label: (<Link to={"/"}>{"Home"}</Link>),
        key: '/',
        icon: '',
    },
    {
        label: (<Link to={"/roles"}>{"Roles"}</Link>),
        key: '/roles',
        icon: '',
    },
];

function Navbar() {
    const onClick: MenuProps['onClick'] = ({ key }) => {
        // go to the react route
        // code here
    }
    return (
        <Menu items={items} mode="horizontal" />
    )
}

export default Navbar;