import { useState, useEffect } from 'react';
import { getTasks } from "../../service/Requests";
import AddTaskField from "../AddTaskField/AddTaskField";
import ShowTasks from "../ShowTasks/ShowTasks";

const MainPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const getAllTasks = async () => {
    const resp = await getTasks();
    if (resp.statusText === 'OK') {
      setTasks(resp.data);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (<>
    <AddTaskField tasks={tasks} setTasks={setTasks} error={error} setError={setError}/>
    <ShowTasks tasks={tasks} setTasks={setTasks} error={error} setError={setError}/>
  </>)
}

export default MainPage;