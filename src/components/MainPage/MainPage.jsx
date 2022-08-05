import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddTaskField, Task } from '../index';
import {
  getTasks,
  addTask,
  changeCheckbox,
  deleteTask,
} from '../../service/requests';
import { sortByDateAndIsCheck } from '../../service/helpers';
import './style.scss';

const MainPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const resp = await getTasks();
      if (resp.statusText === 'OK') {
        setTasks(sortByDateAndIsCheck(resp.data));
      }
    } catch (error) {
      setError('unable to get all tasks');
    }
  };

  const addNewTask = async () => {
    try {
      const resp = await addTask(text);
      if (resp.statusText === 'OK' && text !== '') {
        setTasks(sortByDateAndIsCheck([...tasks, resp.data]));
        setText('');
        setError('');
      }
    } catch (error) {
      setError('unable to add task');
    }
  };

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
        setTasks(sortByDateAndIsCheck([...tasks]));
        setError('');
      }
    } catch (error) {
      setError('unable to change checkbox');
    }
  };

  const removeTask = async (id) => {
    try {
      const resp = await deleteTask(id);
      if (resp.statusText === 'OK') {
        setTasks(tasks.filter((task) => task._id !== id));
        setError('');
      }
    } catch (error) {
      setError('unable to delete task');
    }
  };

  const editTask = (id) => {
    navigate(`/tasks/${id}`, { replace: true });
    setError('');
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
      <AddTaskField
        error={error}
        addNewTask={addNewTask}
        text={text}
        setText={setText}
      />

      <div className="todo-list__content-page">
        {tasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            handleCheckbox={handleCheckbox}
            removeTask={removeTask}
            editTask={editTask}
          />
        ))}
      </div>
    </>
  );
};

export default MainPage;
