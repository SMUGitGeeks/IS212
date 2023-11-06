import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect, useDispatch} from 'react-redux';
import {
    getStaffListingByRLIdAndStaffId,
    getStaffListingsByRLId,
    sortStaffListingsBySkillMatch
} from '../../actions/staffListings';
import {Container} from 'react-bootstrap';
import {Empty, List, Progress, Select, Skeleton, Space, Tag} from 'antd';
import {getRoleListing} from '../../actions/roleListings';
import {getRoleSkillsByRoleId} from '../../actions/roleSkills';
import {AuditOutlined} from '@ant-design/icons';

interface filterOption {
    value: string;
    label: string;
}

// Sort Example:
const sortOptions: filterOption[] = [
    {
        value: 'skillmatch',
        label: 'Skill Match'
    }
]

const RoleApplicants = ({
                            getRoleListing,
                            getRoleSkillsByRoleId, getStaffListingsByRLId, getStaffListingByRLIdAndStaffId,
                            staffListing: {staffListingsByRLId, loading},
                        }: any) => {
    const {roleListingId} = useParams();
    useEffect(() => {
        getStaffListingsByRLId(roleListingId);
        getRoleListing(roleListingId);
        getRoleSkillsByRoleId(roleListingId);
        getStaffListingByRLIdAndStaffId(3);
    }, [getStaffListingsByRLId, getRoleListing, getStaffListingByRLIdAndStaffId, getRoleSkillsByRoleId]);

    const dispatch = useDispatch();

    const onChange = (value: string) => {
        let direction = value;
        if (direction === 'skillmatch') {
            dispatch(sortStaffListingsBySkillMatch({direction}) as any);
        }
    }

    const [dataloaded, setDataLoaded] = useState(false);

    setTimeout(() => {
        setDataLoaded(true);
    }, 2000);

    return (
        <Container>
            <Space direction='vertical' style={{width: '100%'}}>
                <Select
                    style={{width: 200}}
                    placeholder="Sort by"
                    optionFilterProp="children"
                    defaultValue={"skillmatch"}
                    filterOption={true}
                    options={sortOptions}
                    onChange={onChange}
                />
                {!dataloaded ?
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            pageSize: 10,
                        }}
                        dataSource={Array.from({length: 8}).map((_, i) => i)}
                        renderItem={(item: any) => (
                            <List.Item
                                key={item}
                                data-testid="skeleton-list"
                            >
                                <Skeleton active title/>
                            </List.Item>

                        )}
                    />
                    : staffListingsByRLId.length === 0 ?
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No Applicants'/>
                        :
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={staffListingsByRLId.length > 10 ? {
                                onChange: (page) => {
                                },
                                pageSize: 10,
                            } : false}
                            dataSource={staffListingsByRLId}
                            renderItem={(item: any) => (
                                <Link to={`/staff/${item.staff_id}`}>
                                    <List.Item
                                        key={item.role_name}
                                        data-testid="staff-listing"
                                        extra={
                                            <>
                                                <Space direction='vertical'>
                                                    <div style={{fontStyle: "italic"}}>Skill Match</div>
                                                    <Progress type="circle" size={60} percent={item.skill_match} data-testid="skill-match"
                                                        // <Progress type="circle" size={80} percent={90}
                                                            format={(percent) =>
                                                                `${percent}%`
                                                            }/>
                                                </Space>
                                            </>
                                        }
                                    >
                                        <List.Item.Meta
                                            title={
                                                <Space size={10}>
                                                    {item.fname + " " + item.lname}
                                                    <Tag color={item.role_app_status === "applied" ? "green" : "red"}>
                                                        {item.role_app_status === "applied" ? "Applied" : "Withdrawn"}
                                                    </Tag>
                                                </Space>
                                            }
                                            description={
                                                <Space size={30}>
                                                    <Space size={2}>
                                                        <AuditOutlined />
                                                        {new Date(item.app_ts).toLocaleDateString("en-SG")}
                                                    </Space>
                                                    {item.dept}
                                                </Space>
                                            }
                                        />
                                        {item.app_text ? item.app_text : 
                                            <div style={{fontStyle: "italic"}}>No application text</div>
                                        }
                                    </List.Item>
                                </Link>
                            )}
                        />
                }
            </Space>
        </Container>
    )
}
RoleApplicants.propTypes = {
    getStaffListingsByRLId: PropTypes.func.isRequired,
    getRoleListing: PropTypes.func.isRequired,
    getRoleSkillsByRoleId: PropTypes.func.isRequired,
    staffListing: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
    staffListing: state.staffListing,
});

export default connect(mapStateToProps, {
    getStaffListingsByRLId,
    getRoleListing,
    getRoleSkillsByRoleId,
    getStaffListingByRLIdAndStaffId
})(RoleApplicants);
