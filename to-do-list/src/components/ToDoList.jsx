import React, {useState} from "react";
import "./ToDoList.css"

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleClickMoveUp(index) {
        let updatingTasks = tasks.slice();
        if (index != 0)
        {
            [updatingTasks[index], updatingTasks[index-1]] = [updatingTasks[index-1], updatingTasks[index]]
        }
        setTasks(updatingTasks);
    }

    function handleClickMoveDown(index) {
        let updatingTasks = tasks.slice();
        if (index !== tasks.length - 1)
        {
            [updatingTasks[index], updatingTasks[index+1]] = [updatingTasks[index+1], updatingTasks[index]]
        }
        setTasks(updatingTasks);
    }

    function handleClickRemove(index) {
        setTasks(tasks.filter((_,elementIndex)=>elementIndex!=index))
    }

    function handleClickAdd() {
        if (newTask.trim() !== "")
        {
            let updatingTasks = tasks.slice();
            updatingTasks.push(newTask)
            setTasks(updatingTasks)
            setNewTask("")
        }
    }

    function handleInputChange(e) {
        setNewTask(e.target.value)
    }

    return(<>
        <div className="list-container">
            <h1>To Do List</h1>
            <div className="item-input-container">
                <input className="item-input-field" id="NewTaskField" placeholder="Input a new task" value={newTask} onChange={(e)=>handleInputChange(e)}/>
                <button className="add-button" onClick={handleClickAdd}>Add</button>
            </div>
            {tasks.map((task, index) => 
                <div key={index} className="list-item">
                    <span className="item-label">{task}</span>
                    <button className="list-button" onClick={() => handleClickMoveUp(index)}>Move Up</button>
                    <button className="list-button" onClick={() => handleClickMoveDown(index)}>Move Down</button>
                    <button className="list-button remove-button" onClick={() => handleClickRemove(index)}>X</button>
                </div>)}
        </div>
    </>);
}
export default ToDoList;