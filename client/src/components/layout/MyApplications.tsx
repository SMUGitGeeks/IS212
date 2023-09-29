import {Container} from "react-bootstrap";
import type {TableProps} from 'antd';
import {Table, Popover,Button, Row ,Col, Tag} from 'antd';
import type {ColumnsType, FilterValue, SorterResult} from 'antd/es/table/interface';
import { getApplicationsByStaffId } from "../../actions/applications";
import React, {useEffect, useState} from "react";
import {connect, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import { GetApplicationsByStaffIdPayloadType } from "../../types";
import { MoreOutlined } from "@ant-design/icons";

const MyApplications = ({ getApplicationsByStaffId, applications: { applications, loading }, auth: {user} }: any) => {

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
            key: 'roleName',
            // filters: [
            //     {text: 'Joe', value: 'Joe'},
            //     {text: 'Jim', value: 'Jim'},
            // ],
            // filteredValue: filteredInfo.role_name || null,
            // onFilter: (value: any, record) => record.role_name.includes(value),
            sorter: (a, b) => a.role_name.length - b.role_name.length,
            sortOrder: sortedInfo.columnKey === 'roleName' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Date Applied',
            dataIndex: 'app_ts',
            key: 'dateApplied',
            render: (date: any) => <>{new Date(date).toLocaleDateString(undefined,{ year: 'numeric', month: 'long', day: 'numeric' })}</>,
            sorter: (a, b) => new Date(a.app_ts).getTime() - new Date(b.app_ts).getTime(),
            sortOrder: sortedInfo.columnKey === 'dateApplied' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'role_app_status',
            key: 'status',
            // filters: [
            //     {text: 'Applied', value: 'applied'},
            //     {text: 'Withdrawn', value: 'withdrawn'},
            // ],
            render: (record: any) => 
            <Row justify='space-between'>
                <Col span={1}>
                    <Tag color={record === "applied" ? 'green' : "red"}>{record}</Tag>
                </Col>
                <Col span={1}>
                    {
                        record === 'applied' ? 
                        <Popover
                        content={
                            <div>
                                <Button type="text" danger>Withdraw</Button>
                            </div>
                        }
                        trigger="click"
                        >
                            <MoreOutlined />
                        </Popover>
                            : <></>
                    }
                </Col>
            </ Row>,
            // filteredValue: filteredInfo.role_app_status || null,
            // onFilter: (value: any, record) => record.role_app_status.includes(value),
            // sorter: (a, b) => a.role_app_status.length - b.role_app_status.length,
            // sortOrder: sortedInfo.columnKey === 'status' ? sortedInfo.order : null,
            ellipsis: true,
        },
    ];
    // console.log(applications);

    return (

        <Container>
            <h1>My Applications</h1>
            <Table columns={columns} dataSource={applications} onChange={handleChange}/>
        </Container>
    );
}
MyApplications.propTypes = {
    getApplicationsByStaffId: PropTypes.func.isRequired,
    applications: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    applications: state.applications,
    auth: state.auth
});

export default connect(mapStateToProps, { getApplicationsByStaffId })(MyApplications);
