import type { CollapseProps, DescriptionsProps } from "antd";
import {
    Button,
    Col,
    Descriptions,
    Divider,
    Row,
    Space,
    Tag,
    Tooltip,
    Typography,
} from "antd";
import { Container } from "react-bootstrap";
import { StarOutlined } from "@ant-design/icons";
import { rowGutterStyle } from "../../App";
import React, { useEffect } from "react";
import { getRoleSkillsByRoleId } from "../../actions/roleSkills";
import { getRoleListing } from "../../actions/roleListings";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const { Title } = Typography;

export const RoleDescription = ({
    getRoleListing,
    roleListing: { roleListing, loading },
    roleSkill: { roleSkills },
    getRoleSkillsByRoleId,
    staffSkills: { staffSkill },
}: any) => {
    const { roleListingId } = useParams();
    useEffect(() => {
        getRoleListing(roleListingId);
        getRoleSkillsByRoleId(roleListingId);
    }, [getRoleListing]);

    const calculateSkillsMatch = () => {
        let matchedSkills = 0;
        let missingSkills = 0;
        // missingSkillNames is an array of strings
        let missingSkillNames = [] as any;
        let match = 0;
        staffSkill.forEach((staffSkill: any) => {
            roleSkills.forEach((roleSkill: any) => {
                if (
                    staffSkill.skill_id === roleSkill.skill_id &&
                    staffSkill.skill_status === "active"
                ) {
                    matchedSkills += 1;
                } else {
                    missingSkillNames.push(roleSkill.skill_name);
                    missingSkills += 1;
                }
            });
        });

        match = (matchedSkills / (matchedSkills + missingSkills)) * 100;
        return [match.toFixed(2), missingSkillNames];
    };

    // Skills Matching ===================
    // const missingSkills: String[] = [
    //     "Fishing",
    //     "cars"
    // ];
    // const matchedSkills: String[] = [
    //     "Lorry"
    // ]
    // const items: CollapseProps['items'] = [
    //     {
    //         key: '1',
    //         label: 'Skills Matched',
    //         children: (matchedSkills.map((skill: any) => (
    //             <Tag>{skill}</Tag>
    //         ))),
    //     },
    //     {
    //         key: '2',
    //         label: 'Skills Missing',
    //         children: (missingSkills.map((skill: any) => (
    //             <Tag>{skill}</Tag>
    //         ))),
    //     },
    // ];
    const onChange = (key: string | string[]) => {
        // console.log(key);
    };
    // ===================================

    // Important Details =================
    const importantDetails: DescriptionsProps["items"] = [
        {
            key: "1",
            label: "UserName",
            children: "Zhou Maomao",
        },
        {
            key: "2",
            label: "Telephone",
            children: "1810000000",
        },
    ];
    // ===================================

    return loading ? (
        <h1>Loading...</h1>
    ) : (
        <Container>
            <Space direction="vertical" style={{ display: "flex" }} size="large">
                <Row gutter={rowGutterStyle} align="middle">
                    <Col span={20}>
                        <div className="">
                            <h1>{roleListing.role_name}</h1>
                            <h3>Department</h3>
                        </div>
                    </Col>
                    <Col span={4}>
                        <Space direction="vertical" align="center" size="large">
                            <Tooltip title="Add to Favourites">
                                <StarOutlined style={{ fontSize: 24 }} />
                            </Tooltip>

                            <Button type="primary">Apply Now</Button>
                        </Space>
                    </Col>
                </Row>

                <Row gutter={rowGutterStyle} justify="center">
                    <Col span={18}>{roleListing.role_description}</Col>
                    <Col span={6}>
                        <Space direction="vertical">
                            <Descriptions
                                title="User Info"
                                layout="vertical"
                                items={importantDetails}
                            />
                            <Divider />
                            {/* Display Role's skills */}
                            <Title level={5}>All Skills Required</Title>
                            <Space size={[0, 8]} wrap>
                                {roleSkills.map((skill: any) => (
                                    <Tag>{skill.skill_name}</Tag>
                                ))}
                            </Space>

                            <Title level={5}>Skills Match</Title>
                            <Space size={[0, 8]} wrap>
                                {calculateSkillsMatch()[0]}%
                            </Space>

                            <Title level={5}>Skills Missing</Title>
                            <Space size={[0, 8]} wrap>
                                {calculateSkillsMatch()[1].map((skill: any) => (
                                    <Tag>{skill}</Tag>
                                ))}
                            </Space>

                            {/* Separated into skills match vs missing */}
                            {/* <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} /> */}
                        </Space>
                    </Col>
                </Row>
                <Row gutter={rowGutterStyle} justify="center">
                    <img 
                     style={{ width: '100%', height: '240px' }}
                    src="https://media.licdn.com/dms/image/C4E03AQEC1MBLS705zA/profile-displayphoto-shrink_400_400/0/1650103443401?e=1701302400&v=beta&t=01qUXlg6azTUgYa_q9-NxGc8nzvLmxeAVvO3XIK4TMY"/>
                    hi Glen here, I am a row GAHAHAHAHA
                </Row>
            </Space>
        </Container>
    );
};
RoleDescription.propTypes = {
    getRoleSkillsByRoleId: PropTypes.func.isRequired,
    getRoleListing: PropTypes.func.isRequired,
    roleSkill: PropTypes.object.isRequired,
    roleListing: PropTypes.object.isRequired,
    staffSkills: PropTypes.object.isRequired,

    // roleListingId: PropTypes.number.isRequired
};

const mapStateToProps = (state: any) => ({
    roleSkill: state.roleSkill,
    roleListing: state.roleListing,
    staffSkills: state.staffSkills,
});

export default connect(mapStateToProps, {
    getRoleSkillsByRoleId,
    getRoleListing,
})(RoleDescription);
