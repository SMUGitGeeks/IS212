import {Container} from "react-bootstrap";
import type {TableProps} from 'antd';
import {Table} from 'antd';
import type {ColumnsType, FilterValue, SorterResult} from 'antd/es/table/interface';
import SkillsCollapsable from "./SkillsCollapsable";
import { getApplicationsByStaffId } from "../../actions/applications";
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
}

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

const MyApplications = ({ getApplicationsByStaffId, applications: { applications, loading }, auth: {user} }: any) => {

    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
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

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
                {text: 'Joe', value: 'Joe'},
                {text: 'Jim', value: 'Jim'},
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value: any, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            filters: [
                {text: 'London', value: 'London'},
                {text: 'New York', value: 'New York'},
            ],
            filteredValue: filteredInfo.address || null,
            onFilter: (value: any, record) => record.address.includes(value),
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
            ellipsis: true,
        },
    ];
    // const skills = [
    //     {
    //         skill_id: 1,
    //         staff_id: 2,
    //         skill_name: "React",
    //         ss_status: "Approved",
    //     },
    //     {
    //         skill_id: 2,
    //         staff_id: 3,
    //         skill_name: "Python",
    //         ss_status: "Approved",
    //     }
    // ]
    // return (
    //     <Container>
    //         {/* <Space style={{ marginBottom: 16 }}>
    //             <Button onClick={setAgeSort}>Sort age</Button>
    //             <Button onClick={clearFilters}>Clear filters</Button>
    //             <Button onClick={clearAll}>Clear filters and sorters</Button>
    //         </Space> */}
    //         {
    //             staffSkills.map((skill: any) => (
    //             <div>
    //                 {skill.skill_name}
    //             </div> ))
    //         }
    //         <Table columns={columns} dataSource={data} onChange={handleChange} />
    //     </Container>
    // )
    return (

        <Container>
            {loading ? (
                <div>Loading applications...</div>
            ) : (
                <div>
                    {applications.map((application: any) => (
                        <div key={application.staff_id}>
                            {application.role_name} : {application.role_app_status}
                        </div>
                    ))}
                </div>
            )}

            <Table columns={columns} dataSource={data} onChange={handleChange}/>
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
