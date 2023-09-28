import {combineReducers} from "redux";
import roleListing from "./roleListings";
import role from "./roles";
import auth from "./auth";
import staffSkills from "./staffSkills";
import applications from "./applications";

export default combineReducers({
    role,
    roleListing,
    auth,
    staffSkills,
    applications
})