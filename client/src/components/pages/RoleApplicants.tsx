import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect, useDispatch} from 'react-redux';
import {
    getStaffListingByRLIdAndStaffId,
    getStaffListingsByRLId,
    sortStaffListingsBySkillMatch
} from '../../actions/staffListings';
import {Container} from 'react-bootstrap';
import {Empty, List, Select, Skeleton, Space} from 'antd';
import {getRoleListing} from '../../actions/roleListings';
import {getRoleSkillsByRoleId} from '../../actions/roleSkills';

interface filterOption {
    value: string;
    label: string;
}

// Sort Example:
const sortOptions: filterOption[] = [
    {
        value: 'asc',
        label: 'A-Z'
    },
    {
        value: 'desc',
        label: 'Z-A'
    },
    {
        value: 'recent',
        label: 'Most Recent'
    },
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

    return (
        <Container>
            <Space direction='vertical' style={{width: '100%'}}>
                <Select
                    style={{width: 200}}
                    placeholder="Sort by"
                    optionFilterProp="children"
                    filterOption={true}
                    options={sortOptions}
                    onChange={onChange}
                />
                {loading ?
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
                            >
                                <Skeleton active title/>
                            </List.Item>

                        )}
                    />
                    : staffListingsByRLId.length === 0 && !loading ?
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No Applicants'/>
                        :
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={staffListingsByRLId.length > 10 ? {
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 10,
                            } : false}
                            dataSource={staffListingsByRLId}
                            renderItem={(item: any) => (
                                <Link to={`/staff/${item.staff_id}`}>
                                    <List.Item
                                        key={item.role_name}
                                    >
                                        <List.Item.Meta
                                            title={item.fname + " " + item.lname}
                                            description={item.dept}
                                        />
                                        {item.skill_match + "% Match"}
                                        <br/>
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
