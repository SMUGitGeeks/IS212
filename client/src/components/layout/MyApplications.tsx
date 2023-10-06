import {Container} from "react-bootstrap";
import type {TableProps} from 'antd';
import {Table, Popover,Button, Row ,Col, Tag, Skeleton, Space, List} from 'antd';
import type {ColumnsType, FilterValue, SorterResult} from 'antd/es/table/interface';
import {getApplicationsByStaffId} from "../../actions/applications";
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { GetApplicationsByStaffIdPayloadType } from "../../types";
import { MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const MyApplications = ({getApplicationsByStaffId, application: {applications, loading}, auth: {user}}: any) => {

    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<GetApplicationsByStaffIdPayloadType>>({});

    const handleChange: TableProps<GetApplicationsByStaffIdPayloadType>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<GetApplicationsByStaffIdPayloadType>);
    };
    useEffect(() => {
        if (user) {
            getApplicationsByStaffId(user);
        }
    }, [getApplicationsByStaffId, user]);


    // const clearFilters = () => {
    //     setFilteredInfo({});
    // };

    // const clearAll = () => {
    //     setFilteredInfo({});
    //     setSortedInfo({});
    // };

    // const setAgeSort = () => {
    //     setSortedInfo({
    //     order: 'descend',
    //     columnKey: 'age',
    //     });
    // };

    const columns: ColumnsType<GetApplicationsByStaffIdPayloadType> = [
        {
            title: 'Role Name',
            dataIndex: 'role_name',
            // key: 'roleName',
            // filters: [
            //     {text: 'Joe', value: 'Joe'},
            //     {text: 'Jim', value: 'Jim'},
            // ],
            // filteredValue: filteredInfo.role_name || null,
            // onFilter: (value: any, record) => record.role_name.includes(value),
            render: (role_name: any) => 
                <Skeleton loading={loading} active>
                    {role_name}
                </Skeleton>
            ,
            sorter: (a, b) => a.role_name.length - b.role_name.length,
            sortOrder: sortedInfo.columnKey === 'roleName' ? sortedInfo.order : null,
            ellipsis: true,
            // width: '30%',
        },
        {
            title: 'Date Applied',
            dataIndex: 'app_ts',
            // key: 'dateApplied',
            render: (date: any) =>
            <Skeleton loading={loading} active>
                {new Date(date).toLocaleDateString()}
            </Skeleton>
            ,
            sorter: (a, b) => new Date(a.app_ts).getTime() - new Date(b.app_ts).getTime(),
            sortOrder: sortedInfo.columnKey === 'dateApplied' ? sortedInfo.order : null,
            ellipsis: true,
            // width: '20%',
        },
        {
            title: 'Status',
            // dataIndex: 'rl_id',
            // key: '',
            filters: [
                {text: 'Applied', value: 'applied'},
                {text: 'Withdrawn', value: 'withdrawn'},
            ],
            render: (record: any) => 
            <>
                <Skeleton loading={loading} active>
                    <Tag color={record.role_app_status === "applied" ? 'green' : "red"}>{record.role_app_status}</Tag>
                </Skeleton>
                <Popover
                placement="bottom"
                content={
                    <Space direction="vertical" align="center">
                        <Link to={"/roleListing/" + record.rl_id}>View Details</Link>

                        {record.role_app_status === 'applied' ?
                            <Button type="text" danger>Withdraw</Button>
                            : <></>
                        }
                        
                    </Space>
                }
                trigger="click"
                style={{float: 'right'}}
                >
                    <MoreOutlined />
                </Popover>
            </>
            ,
            width: '9rem',
            // elipses: true,
        }
    ];
    // console.log(applications);

    return (

        <Container>
            <h1>My Applications</h1>
            <Table columns={columns} dataSource={
                loading ? 
                Array.from({length: 3}).map((_, i) => {
                    return {
                        key: i,
                        role_name: "",
                        app_ts: "",
                        role_app_status: ""
                    }
                }) :  applications
            } onChange={handleChange}/>
        </Container>
    );
}
MyApplications.propTypes = {
    getApplicationsByStaffId: PropTypes.func.isRequired,
    application: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    application: state.application,
    auth: state.auth
});

export default connect(mapStateToProps, {getApplicationsByStaffId})(MyApplications);
