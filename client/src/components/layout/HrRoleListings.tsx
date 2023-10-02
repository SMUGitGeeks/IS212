import { getRoleListingsCreatedByHR } from "../../actions/roleListings";
import { GetRoleSkillsByRoleIdPayloadType } from "../../types";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";


const HrRoleListings = ({ getRoleListingsCreatedByHR, roleListing: { hrRoleListings, loading }, auth: { user } }: any) => {
    useEffect(() => {
        if (user) {
            getRoleListingsCreatedByHR(user);
        }
    }, [getRoleListingsCreatedByHR, user]);

    return (
        // if HrRoleListings is not null, then print it out
        !loading && HrRoleListings !== null ? (
            <div>
                <h1>Role Listings Created By HR</h1>
                <ul>
                    {hrRoleListings.map((hrRoleListing: any) => (
                        <li key={hrRoleListing.rl_id}> {hrRoleListing.role_name},
                            {hrRoleListing.role_description},
                            {hrRoleListing.role_status},
                            {hrRoleListing.rl_desc},
                            {hrRoleListing.rl_open},
                            {hrRoleListing.rl_close},
                            {hrRoleListing.rl_ts_create},
                            {hrRoleListing.rl_creator},
                            
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <div>
                <h4>No role listings found...</h4>
            </div>
        )
    );

}

HrRoleListings.propTypes = {
    getRoleListingsCreatedByHR: PropTypes.func.isRequired,
    roleListing: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
    roleListing: state.roleListing,
    auth: state.auth,
});

export default connect(mapStateToProps, { getRoleListingsCreatedByHR })(HrRoleListings);