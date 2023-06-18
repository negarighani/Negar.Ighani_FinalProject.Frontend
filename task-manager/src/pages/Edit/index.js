import '../style.css';
import Header from "../../components/Header";
import 'font-awesome/css/font-awesome.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {Navigate, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateTask} from "../../redux/action/taskActions";

const Edit = () => {
    const [changed, setChanged] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);
    const taskId = searchParams.get("id");
    const taskIdAsInt = parseInt(taskId, 10);
    const tasks = useSelector((state) => state.tasks.tasks);
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'ToDo',
    });
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('ToDo');
    const [navigateToHome, setNavigateToHome] = useState(false);
    const role = localStorage.getItem('role');
    const isTitleDisabled = role !== "0";
    const isDescriptionDisabled = role !== "0";
    const isStatusDisabled = role !== "1";

    useEffect(() => {
        const foundTask = tasks.find((task) => task.id === taskIdAsInt);
        if (foundTask) {
            setTask(foundTask);
            setTitle(foundTask.title);
            setDescription(foundTask.description);
            setStatus(foundTask.status);
        }
    }, [taskIdAsInt,tasks]);

    const handleTitleChange = (e) => {
        if (role === "0") {
            setTitle(e.target.value);
        }
    };

    const handleDescriptionChange = (e) => {
        if (role === "0") {
            setDescription(e.target.value);
        }
    };

    const handleStatusChange = (e) => {
        if (role === "1") {
            setChanged(true);
            setStatus(e.target.value);
        }
    };

    function handleEdit(e) {
        e.preventDefault();
        const newTask = {
            id: taskIdAsInt,
            title: title === '' ? task.title : title,
            description: description === '' ? task.description : description,
            status: changed === true ? status : task.status,
        };
        dispatch(updateTask(newTask.id, newTask));
        setNavigateToHome(true); // Set the flag to navigate to home
    };

    const disableOptions = {
        ToDo: ["Blocked", "InQA", "Done", "Deployed"],
        InProgress: ["ToDo", "Done", "Deployed"],
        Blocked: ["InProgress", "InQA", "Done", "Deployed"],
        InQA: ["InProgress", "Blocked", "Deployed"],
        Done: ["ToDo", "InProgress", "Blocked", "InQA"],
        Deployed: ["ToDo", "InProgress", "Blocked", "InQA", "Done"],
    };

    function handleCancel() {
        setNavigateToHome(true); // Set the flag to navigate to home
    }

    if (navigateToHome) {
        return <Navigate to="/home"/>; // Redirect to home page
    }


    return (
        <div className="body">
            <Header title="Edit"/>
            <form>
                <h4 className="message">Edit Task</h4>
                <input
                    type="text"
                    className="input-form"
                    placeholder="   Title"
                    value={title}
                    onChange={handleTitleChange}
                    disabled={isTitleDisabled}
                />
                <textarea
                    className="textarea_form textarea_form_edit"
                    placeholder="  Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    disabled={isDescriptionDisabled}
                ></textarea>
                <br/>
                <select
                    className="select-status"
                    value={status}
                    onChange={handleStatusChange}
                    disabled={isStatusDisabled}
                >
                    <option value="ToDo" disabled={disableOptions[task.status].includes("ToDo")}>
                        ToDo
                    </option>
                    <option value="InProgress" disabled={disableOptions[task.status].includes("InProgress")}>
                        InProgress
                    </option>
                    <option value="Blocked" disabled={disableOptions[task.status].includes("Blocked")}>
                        Blocked
                    </option>
                    <option value="InQA" disabled={disableOptions[task.status].includes("InQA")}>
                        InQA
                    </option>
                    <option value="Done" disabled={disableOptions[task.status].includes("Done")}>
                        Done
                    </option>
                    <option value="Deployed" disabled={disableOptions[task.status].includes("Deployed")}>
                        Deployed
                    </option>
                </select>
                <br/>
                <br/>
                <div>
                    <button className="button_Edit" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} style={{color: '#ffffff'}}/> Edit
                    </button>
                    <button className="button_Edit button_Edit_cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
