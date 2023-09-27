import { combineReducers } from "redux";
import roleListing from "./roleListings";
import role from "./roles";
import auth from "./auth";
import staffSkills from "./staffSkills";

export default combineReducers({
    role,
    roleListing,
    auth,
    staffSkills
})