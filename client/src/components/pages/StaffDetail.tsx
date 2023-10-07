import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from "prop-types";
import { getStaffSkillsByStaffId } from '../../actions/staffSkills';
import { connect } from 'react-redux';
import { Card, Descriptions, Empty, Radio, Space, Tag, Typography } from 'antd';
import { getStaffListing } from '../../actions/staffListings';
import { Container } from 'react-bootstrap';
import type { DescriptionsProps, RadioChangeEvent } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const {Title, Text} = Typography;


const StaffDetail = ({getStaffSkillsByStaffId, 
                    staffSkill: {staffSkill, loading}, 
                    getStaffListing, 
                    staffListing
                }: any) => {

    const {staffId} = useParams();

    useEffect(() => {
        getStaffSkillsByStaffId(staffId)
        getStaffListing(staffId)
    }, [getStaffSkillsByStaffId,getStaffListing]);

    const [skillState, setSkillState] = useState("all");

    const selectChange = (e: RadioChangeEvent) => {
        setSkillState(e.target.value);
    }

    const color = (status: String) => {
        if (status === "active") {
            return "green";
        } else if (status === "in-progress") {
            return "gold";
        } else {
            return "default";
        }
    }

    const tagIcon = (status: String) => {
        if (status === "active") {
            return <CheckCircleOutlined />;
        } else if (status === "in-progress") {
            return <ClockCircleOutlined />;
        } else {
            return <></>;
        }
    }

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Staff ID',
            children: staffListing.staffListing === null ? <LoadingOutlined /> : staffListing.staffListing.staff_id,
        },
        {
            key: '2',
            label: 'Department',
            children: staffListing.staffListing === null? <LoadingOutlined /> : staffListing.staffListing.dept,
        },
        {
            key: '3',
            label: 'Phone',
            children: staffListing.staffListing === null ? <LoadingOutlined /> : staffListing.staffListing.phone,
        },
        {
            key: '4',
            label: 'Email',
            children: staffListing.staffListing === null ? <LoadingOutlined /> : staffListing.staffListing.email,
        },
        {
            key: '5',
            label: 'Address',
            span: 2,
            children: staffListing.staffListing === null ? <LoadingOutlined /> : staffListing.biz_address,
        },
    ];

    type SkillCounts = {
        active: number;
        "in-progress": number;
        unverified: number;
        all: number;
        [key: string]: number;
    };
    
    const numStaffSkillTypes = (staffSkills: any[]) => {
        const counts: SkillCounts = { active: 0, 'in-progress': 0, unverified: 0, all: 0 };
        
        staffSkills.forEach((skill) => {
            if (skill.skill_status === "active") {
                if (skill.ss_status === "active") {
                    counts.active++;
                } else if (skill.ss_status === "in-progress") {
                    counts['in-progress']++;
                } else if (skill.ss_status === "unverified") {
                    counts.unverified++;
                }
                counts.all++;
            }
        });
        
        return counts;
    };

    return (
        <Container>
            <Space direction="vertical" size={20}>
                <Title level={2}>{ staffListing.staffListing === null ? <LoadingOutlined /> : staffListing.staffListing.fname + " " + staffListing.staffListing.lname}</Title>
                <Card>
                    <Title level={3} style={{marginTop:0, marginBottom: 30}}>Staff Details</Title>
                    <Descriptions layout="vertical" items={items} />
                </Card>
                <Card>
                    <Title level={3} style={{marginTop:0, marginBottom: 30}}>Skills</Title>
                    <Space size={20} direction="vertical" style={{width: "100%"}}>
                        <Radio.Group value={skillState} buttonStyle="solid" onChange={selectChange}>
                            <Radio.Button value="all">All</Radio.Button>
                            <Radio.Button value="active">Active</Radio.Button>
                            <Radio.Button value="in-progress">In Progress</Radio.Button>
                            <Radio.Button value="unverified">Unverified</Radio.Button>
                        </Radio.Group>
                        <div></div>

                        {loading ?
                            <div>
                                <LoadingOutlined /> 
                                Loading...
                            </div>
                            : numStaffSkillTypes(staffSkill)[skillState] === 0 ?
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/> :
                            <Space direction='horizontal' wrap style={{width: '100%'}}> {
                                staffSkill.map((skill: any) => (
                                    (skill.ss_status === skillState || skillState === "all") && skill.skill_status === 'active' ?
                                    <Tag style={{padding:10}} color={color(skill.skill_status)} icon={tagIcon(skill.skill_status)} key={skill.skill_id}>
                                        {skill.skill_name}
                                    </Tag>
                            
                                    : 
                                    <></>
                                ))
                            } </Space>
                        }
                    </Space>
                </Card>
            </Space>
        </Container>
    )
}

StaffDetail.propTypes = {
    getStaffSkillsByStaffId: PropTypes.func.isRequired,
    staffSkill: PropTypes.object.isRequired,
    getStaffListing: PropTypes.func.isRequired,
    staffListing: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
    staffSkill: state.staffSkill,
    staffListing: state.staffListing,
});

export default connect(mapStateToProps, {
    getStaffSkillsByStaffId,
    getStaffListing,
})(StaffDetail);