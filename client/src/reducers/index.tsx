import {combineReducers} from "redux";
import roleListing from "./roleListings";
import role from "./roles";
import auth from "./auth";
import staffSkill from "./staffSkills";
import application from "./applications";
import roleSkill from "./roleSkills";

export default combineReducers({
    role,
    roleListing,
    auth,
    staffSkill,
    application,
    roleSkill
})