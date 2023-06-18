import {ADD_TASK, DELETE_TASK, UPDATE_TASK, FETCH_TASKS} from "../action/action-types";

const initialState = {
    tasks: [],
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            const newState = {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
            return newState;
            case FETCH_TASKS:
            const nState = {
                ...state,
                tasks: action.payload,
            };
            return nState;
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? {...task, ...action.payload.updatedTask} : task),
            };

        default:
            return state;
    }
};
export default taskReducer;