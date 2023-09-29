import {combineReducers} from "redux";
import roleListing from "./roleListings";
import role from "./roles";
import auth from "./auth";
import staffSkills from "./staffSkills";
import applications from "./applications";
import roleSkill from "./roleSkills";

export default combineReducers({
    role,
    roleListing,
    auth,
    staffSkills,
    applications,
    roleSkill
})