import { useNavigate } from 'react-router-dom';
import { changeCheckbox, deleteTask } from '../../service/Requests';
import edit from '../../img/edit.svg';
import close from '../../img/close.svg';
import './style.scss';
import { useEffect, useState } from 'react';

const Task = ({ tasks, setTasks, setError, task }) => {
  const navigate = useNavigate();
  const sortableTasks = [...tasks]
  const removeTask = async (id) => {
    try {
      const resp = await deleteTask(id);
      if (resp.statusText === 'OK') {
        setTasks(tasks.filter(task => task._id !== id));
        setError('');
      }
    } catch (error) {
      setError('unable to delete task');
    }
  }
  
  const handleCheckbox = async (id, check) => {
    try {
      const resp = await changeCheckbox(id, check);
      if (resp.statusText === 'OK') {
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i]._id === id) {
            tasks[i].isCheck = resp.data.isCheck;
            break;
          }
        }
        setTasks(sortableTasks.sort((a, b) => {
          return ((a.isCheck > b.isCheck) ? 1 : a.isCheck < b.isCheck ? -1 : 0); 
        }));
        setError('');
      }
    } catch (error) {
      setError('unable to change checkbox');
    }
  }

  const editTask = (id) => {
    navigate(`/tasks/${id}/text`, { replace: true });
    setError('');
  }

  return (<div className={task.isCheck ? 'todo-list__task-container container__checked' : 'todo-list__task-container container__unchecked'}
  id={`container-${task._id}`}>
    <input type="checkbox" onChange={() => handleCheckbox(task._id, task.isCheck)} checked={task.isCheck}/>
    <p className={task.isCheck ? 'todo-list__text-task todo-list__done-text' : 'todo-list__text-task'}>{task.text}</p>
    <button className={task.isCheck ? 'todo-list__hide' : 'todo-list-button edit'} 
      onClick={() => {editTask(task._id)}}
      taskid={task._id}>
      <img src={edit} alt=""/>
    </button>
    <button className="todo-list-button delete" onClick={() => removeTask(task._id)}>
      <img src={close} alt=""/>
    </button>
  </div>)
}

export default Task;