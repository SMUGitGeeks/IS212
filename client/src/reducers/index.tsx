import { combineReducers } from "redux";
import roleListing from "./roleListings";
import staffSkills from "./staffSkills";

export default combineReducers({
    roleListing,
    staffSkills
})