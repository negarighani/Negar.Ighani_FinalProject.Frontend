import Header from "../../components/Header";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {addTask, fetchTasks} from "../../redux/action/taskActions";
import TaskItem from "../../components/TaskItem";


const Home = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, []);

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleAddTask = (e) => {
        e.preventDefault();

        if (title.trim() === "" || description.trim() === "") {
            alert("Please fill in both fields.");
            return;
        }

        const newTask = {
            title: title,
            description: description,
        };

        dispatch(addTask(newTask));

        setTitle("");
        setDescription("");
    };

    return (
        <div className="body">
            <Header title="Home"/>
            <form>
                <h4 style={{color: "black", float: "left", paddingLeft: 60}}>
                    Add a new Task
                </h4>
                <input
                    type="text"
                    className="input-form"
                    required
                    placeholder="Title"
                    value={title}
                    onChange={handleChangeTitle}
                />
                <textarea
                    className="textarea_form"
                    required
                    placeholder="Description"
                    value={description}
                    onChange={handleChangeDescription}
                ></textarea>
                <button className="button_form" onClick={handleAddTask}>
                    <span style={{fontSize: "large", marginRight: "10px"}}>+</span>
                    Add
                </button>
            </form>
            <div className="container">
                <p style={{paddingRight: 350, paddingTop: 15}}>Tasks</p>
                <div className="content">

                    {tasks && tasks.length > 0 ? (
                            tasks.map((task) => (
                                <TaskItem task={task} key={task.id}/>

                        ))
                        )

                        : (
                        <div className="no-task-info">You have nothing to do.<br/>Go get some sleep.
                        </div>
                        )
                    }

                </div>

            </div>
        </div>
    );
};

export default Home;
