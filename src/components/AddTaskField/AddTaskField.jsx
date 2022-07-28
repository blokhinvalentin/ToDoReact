import { useState } from 'react';
import ShowError from '../ShowError/ShowError';
import './style.scss';
import { addTask } from '../../service/Requests';

const AddTaskField = ({ tasks, setTasks, error, setError }) => {
  const [text, setText] = useState('');

  const addNewTask = async () => {
    try {
      const resp = await addTask(text);
      if (resp.statusText === 'OK') {
        setTasks([...tasks, resp.data]);
        setText('');
        setError('');
      }      
    } catch (error) {
      setError('unable to add task');
    }
  }

  return(
  <div className="todo-list__main-page">
    <h1>To-Do List</h1>
    <div className="add-task">
      <input type="text" 
        id="task-input" 
        value={text} 
        onChange={(event) => setText(event.target.value)}/>
      <button type="submit" onClick={addNewTask}>Add</button>
    </div>
  <ShowError errorMessage={error}/>
  </div>
  ) 
}

export default AddTaskField;