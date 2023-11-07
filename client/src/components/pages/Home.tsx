import {Container} from "react-bootstrap";
import type {PaginationProps, TableProps} from 'antd';
import {Skeleton, Space, Table, Tag, Modal, Tooltip} from 'antd';
import type {ColumnsType, FilterValue, SorterResult} from 'antd/es/table/interface';
import {getApplicationsByStaffId, updateApplication} from "../../actions/applications";
import React, {useEffect, useState} from "react";
import {connect, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {GetApplicationsByStaffIdPayloadType} from "../../types";
import {Link} from "react-router-dom";
import type {CustomIconComponentProps} from '@ant-design/icons/lib/components/Icon';
import Icon, {FileTextOutlined, ExclamationCircleFilled} from '@ant-design/icons';

const WithdrawSvg = () => (
    <svg style={{width: '1.0380859375em', height: '1em',verticalAlign: 'middle',fill: 'currentColor',overflow: 'hidden'}} viewBox="0 0 1063 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M915.222303 1002.13232h-206.400524c-19.265685 0-34.850029-30.064286-34.85003-46.793936 0-16.811458 15.502536-30.350612 34.85003-30.350612h199.651399c19.347493 0 34.768222-13.580058 34.768222-30.391516v-107.495161c0-16.975073-15.420729-30.391516-34.768222-30.391516h-248.735948l89.374782 64.955219a27.814577 27.814577 0 0 1 9.816909 21.351778 28.100904 28.100904 0 0 1-10.144139 21.188164 37.87691 37.87691 0 0 1-48.839126 0.409038l-144.922128-126.351808a41.067405 41.067405 0 0 1-3.354111-2.617843 27.405539 27.405539 0 0 1-4.74484-38.040524 34.154665 34.154665 0 0 1 7.771721-7.567202l145.167551-126.679038a38.613178 38.613178 0 0 1 48.839125 0.368135 27.487347 27.487347 0 0 1 10.47137 21.147259 27.569155 27.569155 0 0 1-9.980525 21.351778l-87.779533 76.612799h253.72621c57.756152 0 104.509184 40.658367 104.509184 91.215452v120.461662c0 50.393469-46.548513 107.617872-104.427377 107.617872z m-13.252828-625.09172l-350.422769 230.697376a74.853936 74.853936 0 0 1-42.580846 13.293731c-13.580058 0-27.610058-4.090379-43.030787-11.780291h-0.490845L119.929913 376.018005v443.5607c1.881574 51.784198 25.523965 102.627609 61.110262 105.204548h383.922974v77.308163H165.128601v-0.531749c-61.273878 0-126.310904-93.792391-126.310904-167.091983V342.72232c0-1.554344-0.490845-41.517347 13.089213-67.695773 11.698484-23.069738 37.426968-39.963003 38.367755-40.494752l67.368542-42.008193V106.91197c3.272303-41.517347 26.178426-85.816152 60.823936-85.816152h578.665918c26.669271 0 58.451516 46.875743 60.823936 85.816152V193.014448l55.670059 35.913528c0.899883 0.490845 28.06 17.425015 44.421516 46.098571 16.361516 29.24621 18.24309 72.276997 18.24309 73.831341v237.078368h-74.322187V377.0406zM157.643207 276.049142l-36.486181 26.669271 36.486181 26.669271V276.049142zM778.808163 114.806401c0-13.825481-3.272303-16.893265-15.420728-16.893265H254.666997c-12.639271 0-15.420729 3.55863-15.420729 16.893265v253.030846l242.109534 169.137172s10.757697 7.689913 25.728484 8.221662h0.940787c14.970787 0 27.119213-10.266851 27.119213-10.266852l0.490845-0.531749 243.173032-167.091982V114.806401z m79.598776 160.220146v56.406327l38.367755-27.160117-38.367755-29.24621zM300.315627 331.432874c0-15.911574 13.089213-34.850029 29.000787-34.85003h261.988776c15.911574 0 28.06 18.447609 28.06 34.85003 0 16.40242-11.698484 34.850029-28.06 34.850029H329.316414c-15.911574 0-29.000787-18.979359-29.000787-34.850029z m-5.153878-118.416473c0-15.870671 13.089213-34.850029 29.000788-34.850029h367.234227c15.911574 0 28.06 18.447609 28.06 34.850029 0 16.40242-12.148426 34.850029-28.06 34.850029H324.162537c-15.911574 0-29.000787-18.938455-29.000788-34.850029z"  />
    </svg>
)

const WithdrawIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={WithdrawSvg} {...props} />
); 

const Home = ({
                getApplicationsByStaffId, 
                application: {applications, loading}, 
                auth: {user}
            }: any) => {

    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<GetApplicationsByStaffIdPayloadType>>({});
    const handleChange: TableProps<GetApplicationsByStaffIdPayloadType>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<GetApplicationsByStaffIdPayloadType>);
    };
    useEffect(() => {
        if (user) {
            getApplicationsByStaffId(user);
        }
    }, [getApplicationsByStaffId]);

    // Withdraw Modal ---------
    const { confirm } = Modal;
    const dispatch = useDispatch();

    const [dataloaded, setDataLoaded] = useState(false);

    setTimeout(() => {
        setDataLoaded(true);
    }, 3000);

    const showPromiseConfirm = (id:any) => {
        confirm({
            title: 'Warning',
            icon: <ExclamationCircleFilled />,
            content: <div>Are you sure you want to withdraw this application? <br /> rl_id: {id}</div>,
            okText: "Confirm Withdraw",
            okButtonProps: {danger: true},
            onOk() {
                let payload = {
                    "rl_id": id,
                    "staff_id": user,
                    "role_app_status": "withdrawn",
                    // "app_text": textBody,
                }
                dispatch(updateApplication(payload) as any)
                    .catch(() => console.log('Oops errors!'));
                // dispatch(getApplicationsByStaffId(user) as any)
            },
            onCancel() {},
            width: '30rem'
        });
    };
    // ------------------------

    const columns: ColumnsType<GetApplicationsByStaffIdPayloadType> = [
        {
            title: 'Role Name',
            dataIndex: 'role_name',
            render: (role_name: any) =>
                <Skeleton active style={{width: "100%"}} paragraph={{width: "100%", rows: 1}} title={false} loading={!dataloaded}> 
                    {role_name}
                </Skeleton>
            ,
            sorter: (a, b) => a.role_name.length - b.role_name.length,
            sortOrder: sortedInfo.columnKey === 'roleName' ? sortedInfo.order : null,
            // ellipsis: true,
            width: '44rem',
        },
        {
            title: 'Date Applied',
            dataIndex: 'app_ts',
            render: (date: any) =>
                <Skeleton active style={{width: "100%"}} paragraph={{width: "100%", rows: 1}} title={false} loading={!dataloaded}> 
                    {new Date(date).toLocaleDateString()}
                </Skeleton>
            ,
            sorter: (a, b) => new Date(a.app_ts).getTime() - new Date(b.app_ts).getTime(),
            sortOrder: sortedInfo.columnKey === 'dateApplied' ? sortedInfo.order : null,
            // ellipsis: true,
            width: '44rem',
            responsive: ['md'],
        },
        {
            title: 'Status',
            filters: [
                {text: 'Applied', value: 'applied'},
                {text: 'Withdrawn', value: 'withdrawn'},
            ],
            dataIndex: 'role_app_status',
            render: (record: any) =>
                <Skeleton active style={{width: "100%"}} paragraph={{width: "100%", rows: 1}} title={false} loading={!dataloaded}> 
                    <Tag color={record === "applied" ? 'green' : "red"}>
                        {record === "applied" ? 'Applied' : "Withdrawn"}
                    </Tag>
                </Skeleton> 
            ,
            width: '6rem',
            responsive: ['sm'],
        },
        {
            title: 'Actions',
            // dataIndex: 'rl_id',
            render: (record: any) => 
                <Skeleton active style={{width: "100%"}} paragraph={{width: "100%", rows: 1}} title={false} loading={!dataloaded}> 
                    <Space size={10}>
                        <Tooltip placement="top" title="View Details">
                            <Link to={"/roleListing/" + record.rl_id}>
                                <FileTextOutlined style={{fontSize: 18}}/>
                            </Link>
                        </Tooltip>
                        {

                            record.role_app_status === "applied" && record.rl_status != "Closed"?
                                <Tooltip placement="top" title="Withdraw" >
                                    <span onClick={() => showPromiseConfirm(record.rl_id)}>
                                        <WithdrawIcon style={{fontSize: 18}}/>
                                    </span>
                                </Tooltip>
                                : null
                        }
                    </Space>
                </Skeleton>
            ,
            width: '6rem',  
        }
    ];

    const showTotal: PaginationProps['showTotal'] = (total) => `Total: ${total}`;

    return (
        <Container>
            <h1>My Applications</h1>
            <Table 
                columns={columns} 
                dataSource={
                    !dataloaded ?
                        Array.from({length: 3}).map((_, i) => {
                            return {
                                key: i,
                                role_name: "",
                                app_ts: "",
                                role_app_status: "",
                                rl_id: ""
                            }
                        }) : applications
                } 
                onChange={handleChange}
                pagination={ 
                    applications.length < 10 ? false : 
                    { 
                        total: applications.length, 
                        defaultCurrent: 1, 
                        pageSize: 10, 
                        responsive: true, 
                        showTotal: showTotal,
                        size: "small"
                    }
                }
            />
        </Container>
    )
}

Home.propTypes = {
    getApplicationsByStaffId: PropTypes.func.isRequired,
    application: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    application: state.application,
    auth: state.auth
});

export default connect(mapStateToProps, {getApplicationsByStaffId})(Home);