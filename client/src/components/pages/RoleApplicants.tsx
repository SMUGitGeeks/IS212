import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect, useDispatch } from 'react-redux';
import { getApplicantByStaffId, getApplicantsByRoleListingId } from '../../actions/applicants';
import { Container } from 'react-bootstrap';
import { List, Select, Skeleton, Space } from 'antd';
import { getRoleListing } from '../../actions/roleListings';
import { getRoleSkillsByRoleId } from '../../actions/roleSkills';

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

const RoleApplicants = ({getRoleListing,
                        roleListing: {roleListing},
                        roleSkill: {roleSkills},
                        getRoleSkillsByRoleId,
                        getApplicantsByRoleListingId,
                        applicants: {applicants, loading},
                        staffSkill: {staffSkill},
                        getApplicantByStaffId
                    }: any) => {
    const {roleListingId} = useParams();
    useEffect(() => {
        getApplicantsByRoleListingId(roleListingId);
    }, [getApplicantsByRoleListingId]);
    
    useEffect(() => {
        getRoleListing(roleListingId);
        getRoleSkillsByRoleId(roleListingId);
    }, [getRoleListing]);

    useEffect(() => {
        getApplicantByStaffId(3);
    }, [getApplicantByStaffId]);

    const dispatch = useDispatch();

    const onChange = (value: string) => {
        console.log(value)
        let direction = value;
        // if (direction === 'recent') {
        //     dispatch(sortRoleListingsByDate({direction}) as any);
        // } else if (direction === 'skillmatch') {
        //     dispatch(sortRoleListingsBySkillMatch({direction}) as any);
        // } else {
        //     dispatch(sortRoleListingsByName({direction}) as any);
        // }
    }

    const calculateSkillsMatch = () => {
        let matchedSkills = 0;
        // let missingSkills = 0;
        let numRoleSkills = roleSkills.length;

        let missingSkillNames = [] as any;
        staffSkill.forEach((staffSkill: any) => {
            roleSkills.forEach((roleSkill: any) => {
                if (
                    staffSkill.skill_id === roleSkill.skill_id &&
                    (staffSkill.skill_status === "in-progress" || staffSkill.skill_status === "unverified")
                ) {
                    missingSkillNames.push([roleSkill.skill_name, roleSkill.skill_status]);
                } else if (
                    staffSkill.skill_id !== roleSkill.skill_id
                ) {
                    missingSkillNames.push([roleSkill.skill_name, "missing"]);
                } else {
                    matchedSkills++;
                }
            });
        });

        let match = (matchedSkills / numRoleSkills) * 100;
        return [match.toFixed(2), missingSkillNames];
    };

    return (
        <Container>
            <Space direction='vertical'>
                <Select
                    style={{width: 200}}
                    placeholder="Sort by"
                    // defaultValue={'default'}
                    optionFilterProp="children"
                    filterOption={true}
                    options={sortOptions}
                    onChange={onChange}
                />
                { loading ?
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
                    :
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 10,
                        }}
                        dataSource={applicants}
                        footer={
                            <div>
                                <b>ant design</b> footer part
                            </div>
                        }
                        renderItem={(item: any) => (
                            <Link to={`/staff/${item.staff_id}`}>
                                <List.Item
                                    key={item.role_name}
                                    // actions={[
                                    //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                    //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                    //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                    // ]}
                                    // extra={
                                        
                                    // }
                                >
                                    <List.Item.Meta
                                        title={item.fname + " " + item.lname}
                                        description={item.dept}
                                    />
                                    {calculateSkillsMatch()[0] + "% Match"}
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
    getApplicantsByRoleListingId: PropTypes.func.isRequired,
    applicants: PropTypes.object.isRequired,
    getRoleListing: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired,
    roleSkill: PropTypes.object.isRequired,
    getRoleSkillsByRoleId: PropTypes.func.isRequired,
    staffSkill: PropTypes.object.isRequired,
    getApplicantByStaffId: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
    applicants: state.applicants,
    roleListing: state.roleListing,
    roleSkill: state.roleSkill,
    staffSkill: state.staffSkill,
});

export default connect(mapStateToProps, {
    getApplicantsByRoleListingId,
    getRoleListing,
    getRoleSkillsByRoleId,
    getApplicantByStaffId
})(RoleApplicants);
