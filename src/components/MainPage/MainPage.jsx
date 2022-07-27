import React from "react";

import ShowAddOption from "../ShowAddOption/ShowAddOption";
import ShowTasks from "../ShowTasks/ShowTasks";

import './style.scss';

const MainPage = ({ tasks, setTasks, error, setError }) => {
  return (<>
    <ShowAddOption tasks={tasks} setTasks={setTasks} error={error} setError={setError}/>
    <ShowTasks tasks={tasks} setTasks={setTasks} error={error} setError={setError}/>
  </>)
}

export default MainPage;