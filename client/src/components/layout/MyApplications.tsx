import { Container } from "react-bootstrap";
import type { TableProps } from 'antd';
import { Button, Space, Table } from 'antd';
import type { ColumnsType, FilterValue, SorterResult } from 'antd/es/table/interface';
import { useState } from "react";
import SkillsCollapsable from "./SkillsCollapsable";
import { getSkills } from "../../actions/skills";

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

const MyApplications = () => {
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };

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
            { text: 'Joe', value: 'Joe' },
            { text: 'Jim', value: 'Jim' },
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
            { text: 'London', value: 'London' },
            { text: 'New York', value: 'New York' },
        ],
        filteredValue: filteredInfo.address || null,
        onFilter: (value: any, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
        ellipsis: true,
        },
    ];
    const skills = ({ getskills, skills: { skills, loading } }: any) => {
        useEffect(() => {
            getSkills();
    
        }, [getSkills]);
    }
    // const Skills = [
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
    return (
        <Container>
            {/* <Space style={{ marginBottom: 16 }}>
                <Button onClick={setAgeSort}>Sort age</Button>
                <Button onClick={clearFilters}>Clear filters</Button>
                <Button onClick={clearAll}>Clear filters and sorters</Button>
            </Space> */}
            {
                skills.map((skill: any) => (
                <div>
                    {skill.skill_name}
                </div> ))
            }
            <Table columns={columns} dataSource={data} onChange={handleChange} />
        </Container>
    )
}

export default MyApplications;

function useEffect(arg0: () => void, arg1: (() => (dispatch: any) => Promise<void>)[]) {
    throw new Error("Function not implemented.");
}
