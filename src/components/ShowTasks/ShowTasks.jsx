import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.scss';

import edit from '../../img/edit.svg';
import close from '../../img/close.svg';

const ShowTasks = ({ tasks, setTasks, error, setError }) => {
  const host = `http://localhost:8000/tasks`;
  const navigate = useNavigate();

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${host}/${id}`).then(() => {
        setTasks(tasks.filter(task => task._id !== id));
        setError('');
      })
    } catch (error) {
      setError('unable to delete task');
    }
  }
  
  const changeCheckbox = async (id, check) => {
    try {
      await axios.patch(`${host}/${id}/checkbox`, { isCheck: !check }).then(result => {
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i]._id === id) {
            tasks[i].isCheck = result.data.isCheck;
            break;
          }
        }
        setTasks(tasks.map(task => task));
        setError('');
      })
    } catch (error) {
      setError('unable to change checkbox');
    }
  }

  const editTask = (id) => {
    navigate(`/tasks/${id}/text`, { replace: true });
    setError('');
  }

  useEffect(() => {
    tasks.sort((a, b) => (a.isCheck > b.isCheck) ? 1 : a.isCheck < b.isCheck ? -1 : 0);
  }, [])

  return (<>
    <div className="todo-list__content-page">{tasks.map(task => 
      <div key={`task-${task._id}`} 
      className={task.isCheck ? 'todo-list__task-container container__checked' : 'todo-list__task-container container__unchecked'}
      id={`container-${task._id}`}>
        <input type="checkbox" onChange={() => changeCheckbox(task._id, task.isCheck)} checked={task.isCheck}/>
        <p className={task.isCheck ? 'todo-list__done-text' : 'todo-list__text-task'}>{task.text}</p>
          <button className={task.isCheck ? 'todo-list__hide' : 'todo-list-button edit'} 
          onClick={() => {editTask(task._id)}}
          taskid={task._id}>
          <img src={edit} alt=""/>
        </button>
        <button className="todo-list-button delete" onClick={() => deleteTask(task._id)}>
          <img src={close} alt=""/>
        </button>
      </div>)}
    </div>
  </>
  )
}

export default React.memo(ShowTasks);