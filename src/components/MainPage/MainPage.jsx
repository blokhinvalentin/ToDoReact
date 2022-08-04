import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddTaskField, Task } from '../index';
import {
  getTasks,
  addTask,
  changeCheckbox,
  deleteTask,
} from '../../service/requests';
import { sortByIsCheck } from '../../service/helpers';
import './style.scss';

const MainPage = () => {
  const [tasks, setTasks] = useState([]);
  const [sortableTasks, setSortableTasks] = useState([]);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      if (tasks.length === 0) {
        const resp = await getTasks();
        if (resp.statusText === 'OK') {
          setTasks(resp.data);
          setSortableTasks(resp.data);
        }
      }
    } catch (error) {
      setError('unable to get all tasks');
    }
  };

  const addNewTask = async () => {
    try {
      const resp = await addTask(text);
      if (resp.statusText === 'OK' && text !== '') {
        setTasks([...tasks, resp.data]);
        setSortableTasks([...sortableTasks, resp.data].sort((a, b) => {
            return (a.isCheck > b.isCheck) ? 1 : a.isCheck < b.isCheck ? -1 : 0;
          }));
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
        setSortableTasks(
          [...tasks].sort((a, b) => {
            return (a.isCheck > b.isCheck) ? 1 : a.isCheck < b.isCheck ? -1 : 0;
          })
        );
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
        setSortableTasks(sortableTasks.filter((task) => task._id !== id))
        setError('');
      }
    } catch (error) {
      setError('unable to delete task');
    }
  };

  const editTask = (id) => {
    navigate(`/tasks/${id}/text`, { replace: true });
    setError('');
  };

  const sortArray = (array) => {
    return sortByIsCheck();
  }

  useEffect(() => {
    getAllTasks();
  }, [sortableTasks]);

  console.log('tasks', tasks);
  console.log('sortableTasks', sortableTasks);

  return (
    <>
      <AddTaskField
        error={error}
        addNewTask={addNewTask}
        text={text}
        setText={setText}
      />
      <div className="todo-list__content-page">
        {sortableTasks.map((task) => (
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
