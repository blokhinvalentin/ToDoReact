import React, { useState } from 'react';

import ShowError from '../ShowError/ShowError';

import axios from 'axios';
import './style.scss';

const ShowAddOption = ({ tasks, setTasks, error, setError }) => {
  const [text, setText] = useState('');

  const addTask = async () => {
    try {
      await axios.post('http://localhost:8000/tasks', {
        text,
        isCheck: false
      }).then(result => {
        setTasks([...tasks, result.data]);
        setText('');
        setError('');
      })
    } catch (error) {
      setError('unable to add task');
    }
  }

  return(
  <div className="todo-list__main-page">
    <h1>To-Do List</h1>
    <div className="add-task-field">
      <input type="text" id="task-input" value={text} onChange={(inp) => setText(inp.target.value)}/>
      <button onClick={addTask}>Add</button>
    </div>
  <ShowError errorMessage={error}/>
  </div>
  ) 
}

export default React.memo(ShowAddOption);