import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect, useDispatch } from 'react-redux';
import { getApplicantsByRoleListingId } from '../../actions/applicants';
import { Container } from 'react-bootstrap';
import { List, Select, Skeleton, Space } from 'antd';

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

const RoleApplicants = ({getApplicantsByRoleListingId, applicants: {applicants, loading}}: any) => {
    const {roleListingId} = useParams();
    useEffect(() => {
        getApplicantsByRoleListingId(roleListingId);
    }, [getApplicantsByRoleListingId]);

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
                                    
                                >
                                    <List.Item.Meta
                                        title={item.fname + " " + item.lname}
                                        description={item.dept}
                                    />
                                    {item.skill_match}
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
};

const mapStateToProps = (state: any) => ({
    applicants: state.applicants,
});

export default connect(mapStateToProps, {
    getApplicantsByRoleListingId,
})(RoleApplicants);
