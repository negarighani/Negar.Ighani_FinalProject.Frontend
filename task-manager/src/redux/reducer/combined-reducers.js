import { combineReducers } from "redux";
import taskReducer from "./taskReducer";

const combinedReducers = combineReducers({
    tasks: taskReducer
});

export default combinedReducers;
