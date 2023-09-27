import { combineReducers } from "redux";
import roleListing from "./roleListings";
import role from "./roles";

export default combineReducers({
    roleListing,
    role
})