import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import TextInput from "../TextInput/TextInput";
import MainPage from "../MainPage/MainPage";

import './style.scss';

const ShowPage = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const host = `http://localhost:8000/tasks`;

  const getTasks = async () => {
    await axios.get(host).then(result => {
      setTasks(result.data);
    });
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (<>
  <Routes>
    <Route path="/tasks" 
      element={<MainPage tasks={tasks} setTasks={setTasks} error={error} setError={setError}/>}
    />
    <Route path={`/tasks/:id/text`} 
      element={<TextInput tasks={tasks} setTasks={setTasks} error={error} setError={setError}/>}
    />
  </Routes>
  </>
  )
}

export default ShowPage;