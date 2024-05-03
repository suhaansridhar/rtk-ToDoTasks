import { nanoid } from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import { addTask, removeTask, completedTask } from '../features/Tasks/taskSlice';
import { useState, useRef } from 'react';

function ToDoComponent() {
  const [taskName, setTaskName] = useState("");
  const inputRef = useRef(null);
  const tasks = useSelector(state => state.tasks['incomplete']);
  const tasksComplete = useSelector(state => state.tasks['completed']);
  const [showComplete, setShowComplete] = useState(false);
  const dispatch = useDispatch();

  function showCompletedTasks(){
    setShowComplete(!showComplete);
  }

  function handleSubmit() {
    if (taskName.trim() !== "") {
        addTask(taskName.trim());
        dispatch(addTask({id: nanoid(), taskName : taskName, completed: false}));
        inputRef.current.focus();
        setTaskName("");
    }
  }

  function handleKeyPress(event){
    if(event.key === "Enter"){
      handleSubmit();
    }
  }

  return (
    <div className="todo--container">
      <div className="todo--container--tasks">
        <div className="todo--container--displaying--tasks">
          <ul>
            {tasks.map((task) => (
              <li key={task.id} className="tasks--items">
                <button onClick={() => dispatch(completedTask(task.id))}>Completed</button>
                <p>{task.taskName}</p>
                <button onClick={() => dispatch(removeTask(task.id))}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
  
        <br /><br /><br />

      <div className="todo--container--adding--tasks">
        <div className="todo--container--input">
            <input
            type="text"
            placeholder="Enter the Task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            ref={inputRef}
            autoFocus
            className="todo--container--input--text"
            onKeyPress={handleKeyPress}
            />
            <button onClick={handleSubmit}>Add Task</button>
        </div>
      </div>

    <div className='show--completed--tasks'>
        <button onClick={showCompletedTasks}>Completed Tasks</button>
            {showComplete && (
                <ul>
                    {tasksComplete.map(task => (
                        <li key={task.id}>
                            <h2 className='task--name--completed'>{task.taskName}</h2>
                        </li>
                    ))}
                </ul>
            )}
        </div>

    </div>
  );
}

export default ToDoComponent

