import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {deleteTask} from "../redux/action/taskActions";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

const TaskItem = (props) => {
    const dispatch = useDispatch();
    const {task} = props;
    const role = localStorage.getItem('role');

    const handleDeleteClick = (e) => {
        e.preventDefault();
        dispatch(deleteTask(task.id));
    };

    return (
        <div className="task-container">
            <div className="title">{task.title}</div>
            <p className="p">{task.description}</p>
            <div className="edit">
                <button className="button" disabled={true}>{task.status}</button>
                <div>
                    <Link to={`/edit?id=${task.id}`}>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{
                                color: "black",
                                fontSize: "1.8rem",
                                marginLeft: role === "0" ? "4px" : "30px",
                            }}
                        />
                    </Link>
                    {role === "0" && (
                        <FontAwesomeIcon
                            icon={faTrash}
                            style={{color: 'black', fontSize: '1.8rem', marginLeft: '2px'}}
                            onClick={handleDeleteClick}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
