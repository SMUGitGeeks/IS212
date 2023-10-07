import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import PropTypes from "prop-types";
import {connect, useDispatch} from 'react-redux';
import {getStaffListingsByRLId} from '../../actions/staffListings';
import {Container} from 'react-bootstrap';
import {Empty, List, Select, Skeleton, Space} from 'antd';
import {getRoleListing} from '../../actions/roleListings';
import {getRoleSkillsByRoleId} from '../../actions/roleSkills';
import {sortStaffListingsBySkillMatch} from '../../actions/staffListings';

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
                            roleListing: {roleListing},
                            roleSkill: {roleSkills},
                            getRoleSkillsByRoleId, getStaffListingsByRLId,
                            staffListing: {staffListingsByRLId, loading},
                            staffSkill: {staffSkill},
                        }: any) => {
    const {roleListingId} = useParams();
    useEffect(() => {
        getStaffListingsByRLId(roleListingId);
        getRoleListing(roleListingId);
        getRoleSkillsByRoleId(roleListingId);
    }, [getStaffListingsByRLId, getRoleListing, getRoleSkillsByRoleId]);

    const dispatch = useDispatch();

    const onChange = (value: string) => {
        console.log(value)
        let direction = value;
        // if (direction === 'recent') {
        //     dispatch(sortRoleListingsByDate({direction}) as any);
        // } else 
        if (direction === 'skillmatch') {
            dispatch(sortStaffListingsBySkillMatch({direction}) as any);
        }
        //  else {
        //     dispatch(sortStaffListingsByFName({direction}) as any);
        // }
    }

    return (
        <Container>
            <Space direction='vertical' style={{width: '100%'}}>
                <Select
                    style={{width: 200}}
                    placeholder="Sort by"
                    // defaultValue={'default'}
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
                    : staffListingsByRLId.length === 0 && !loading?
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='No Applicants'/>
                    :
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={ staffListingsByRLId.length > 10 ? {
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 10,
                        }: false}
                        dataSource={staffListingsByRLId}
                        // footer={
                        //     <div>
                        //         <b>ant design</b> footer part
                        //     </div>
                        // }
                        renderItem={(item: any) => (
                            <Link to={`/staff/${item.staff_id}`}>
                                <List.Item
                                    key={item.role_name}
                                    // extra={
                                    // }
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
    roleListing: PropTypes.object.isRequired,
    roleSkill: PropTypes.object.isRequired,
    getRoleSkillsByRoleId: PropTypes.func.isRequired,
    staffSkill: PropTypes.object.isRequired,
    staffListing: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
    staffListing: state.staffListing,
    roleListing: state.roleListing,
    roleSkill: state.roleSkill,
    staffSkill: state.staffSkill,
});

export default connect(mapStateToProps, {
    getStaffListingsByRLId,
    getRoleListing,
    getRoleSkillsByRoleId
})(RoleApplicants);
