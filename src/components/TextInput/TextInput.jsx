import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowError from "../ShowError/ShowError";
import { getTasks, confirmTaskEditing } from "../../service/Requests";

import done from '../../img/done.svg';
import close from '../../img/close.svg';
import './style.scss';

const TaskEditing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const getAllTasks = async () => {
      const resp = await getTasks();
      if (resp.statusText === 'OK') {
        setTasks(resp.data);
      }
    };
    getAllTasks();
  }, []);

  useEffect(() => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i]._id === id) {
        setText(tasks[i].text);
      }
    }
  }, [tasks])

  const saveTaskEditing = async (id) => {
    try {
      const resp = await confirmTaskEditing(id, text);
      if (resp.statusText === 'OK') {
        navigate("/tasks");
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i]._id === id) {
            tasks[i] = resp.data;
          }
        }
      }
    } catch (error) {
      setError('unable to update text');
    } 
  }

  const cancelTaskEditing = () => {
    navigate("/tasks");
    setError('');
  }

  return (
  <div className="todo-list__single-page">
    <ShowError errorMessage={error}/>
    <div className="todo-list__task-container container__unchecked" id={`container-${id}`}>
      <input type="text" value={text} onChange={(event) => setText(event.target.value)} autoFocus/>
      <button className="todo-list-button" onClick={() => {saveTaskEditing(id)}}>
        <img src={done} alt=""/>
      </button>
      <button className="todo-list-button" onClick={() => {cancelTaskEditing()}}>
        <img src={close} alt=""/>
      </button>
    </div>
  </div>
  )
}

export default TaskEditing;