import { combineReducers } from "redux";
import role from "./role";
import auth from "./auth";

export default combineReducers({
    role,
    auth
})