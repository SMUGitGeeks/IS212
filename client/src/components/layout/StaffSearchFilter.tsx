import {Select, SelectProps, Space, Typography} from "antd";
import {
    filterStaffListingsBySkillId,
    filterStaffListingsByStaffId,
    getStaffListings
} from '../../actions/staffListings';
import {getSkills} from '../../actions/skills';
import {connect, useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {useEffect} from "react";

const {Title} = Typography;

const StaffSearchFilter = ({getStaffListings, getSkills, skill, staffListing: {rawStaffListings, loading}}: any) => {

    useEffect(() => {
        getStaffListings();
        getSkills();
    }, [getStaffListings, getSkills]);
    const dispatch = useDispatch();

    let staffNames: SelectProps['options'] = [
        {
            label: "Loading...",
            value: "",
            disabled: true,
        }
    ];
    let skillNames: SelectProps['options'] = [
        {
            label: "Loading...",
            value: "",
            disabled: true,
        }
    ];
    if (!loading) {
        staffNames = rawStaffListings.map((staff: any) => {
            return {
                label: staff.fname + " " + staff.lname,
                value: staff.staff_id,
            }
        });
    }
    if (!skill.loading) {
        skillNames = skill.skills.map((skill: any) => {
            return {
                label: skill.skill_name,
                value: skill.skill_id,
            }
        });
    }

    const handleStaffChange = (staffIds: number[]) => {
        dispatch(filterStaffListingsByStaffId({staffIds}) as any);
    }

    const handleSkillChange = (skillIds: number[]) => {
        dispatch(filterStaffListingsBySkillId({skillIds}) as any);
    }


    return (
        <Space direction='vertical' size="small" style={{width: "100%"}}>
            <Title level={4}>Filters</Title>
            <Title level={5}>Role Type</Title>
            <Select
                mode="multiple"
                style={{width: '80%'}}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleStaffChange}
                options={staffNames}
                optionFilterProp={"label"}
            />
            <Select
                mode="multiple"
                style={{width: '80%'}}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleSkillChange}
                options={skillNames}
                optionFilterProp={"label"}
            />
        </Space>
    );
}

StaffSearchFilter.propTypes = {
    getStaffListings: PropTypes.func.isRequired,
    getSkills: PropTypes.func.isRequired,
    staffListing: PropTypes.object.isRequired,
    skill: PropTypes.object.isRequired
}

const mapStateToProps = (state: any) => ({
    staffListing: state.staffListing,
    skill: state.skill
});

export default connect(mapStateToProps, {getStaffListings, getSkills})(StaffSearchFilter);