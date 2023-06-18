import {ADD_TASK, UPDATE_TASK, DELETE_TASK, FETCH_TASKS} from "./action-types";

export const addTask = task => {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append("title", task.title);
            formData.append("description", task.description);
            const response = await fetch('http://localhost/Negar.Ighani_FinalProject.Backend/create', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseText = await response.text();
                const addedTask = JSON.parse(responseText);
                dispatch({
                    type: ADD_TASK,
                    payload: addedTask,
                });
            } else {
                console.log('Failed to add task');
            }
        } catch (error) {
            console.log('Failed to add task - error: ' + error);
        }
    };
};
export const fetchTasks = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost/Negar.Ighani_FinalProject.Backend/read_all');
            if (response.ok) {
                const responseText = await response.text();
                const tasks = JSON.parse(responseText);
                dispatch({
                    type: FETCH_TASKS,
                    payload: tasks,
                });
            } else {
                console.log('Failed to fetch tasks');
            }
        } catch (error) {
            console.log('Failed to fetch tasks - error:', error);
        }
    };
};

export const deleteTask = taskId => {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append("id", taskId);
            const response = await fetch(`http://localhost/Negar.Ighani_FinalProject.Backend/delete`, {
                method: 'POST',
                body:formData,
            });

            if (response.ok) {
                const responseText = await response.text();
                const task_Id = JSON.parse(responseText);
                dispatch({
                    type: DELETE_TASK,
                    payload: taskId,
                });
            } else {
                console.log('Failed to delete task');
            }
        } catch (error) {
            console.log('Failed to delete task - error: ' + error);
        }
    };
};

export const updateTask = (taskId, updatedTask) => {
    return async dispatch => {
        const formData = new FormData();
        formData.append("id", updatedTask.id);
        formData.append("title", updatedTask.title);
        formData.append("description", updatedTask.description);
        formData.append("status", updatedTask.status);
        try {
            const response = await fetch(`http://localhost/Negar.Ighani_FinalProject.Backend/update`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                dispatch({
                    type: UPDATE_TASK,
                    payload: {
                        id: taskId,
                        updatedTask: updatedTask,
                    },
                });
            } else {
                console.log('Failed to update task');
            }
        } catch (error) {
            console.log('Failed to update task - error: ' + error);
        }
    };
};

