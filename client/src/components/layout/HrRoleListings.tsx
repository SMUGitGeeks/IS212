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
                {hrRoleListings.map((hrRoleListing: any) => (
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <h5>{hrRoleListing.role_name}</h5>
                                <p className="card-text">{hrRoleListing.role_description}</p>
                                <p className="card-text">{hrRoleListing.role_status} (if this role even continue to exist)</p> 
                                <p className="card-text">Location: {hrRoleListing.location}</p>
                                <p className="card-text"> Department: {hrRoleListing.department}</p>
                                <p className="card-text"> Role Listing desc: {hrRoleListing.rl_desc}</p>
                                <p className="card-text"> Start Application Date: {hrRoleListing.rl_open}</p>
                                <p className="card-text"> Close Application Date: {hrRoleListing.rl_close}</p>
                                <p className="card-text"> Created on: {hrRoleListing.rl_ts_create}</p>
                                <p className="card-text"> Created by: {hrRoleListing.rl_creator}</p>
                                <p className="card-text">{hrRoleListing.rl_status} (status of role list, whether still open to apply/ closed)</p>  
                            </div>
                        </div>
                    </div>
                ))} 
                
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