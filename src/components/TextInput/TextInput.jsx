import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ShowError from "../ShowError/ShowError";

import done from '../../img/done.svg';
import close from '../../img/close.svg';
import './style.scss';

const TextInput = ({ tasks, setTasks, error, setError }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const host = `http://localhost:8000/tasks`;
  let previousText = '';
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]._id === id) {
      previousText = tasks[i].text;
    }
  }
  console.log(previousText);

  const [text, setText] = useState(previousText);

  const confirmTaskEditing = async (id) => {
    try {
      await axios.patch(`${host}/${id}/text`, { text: text }).then(result => {
        navigate("/tasks");
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i]._id === id) {
            tasks[i] = result.data;
          }
        }
      })
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
      <input type="text" value={text} onChange={(inp) => setText(inp.target.value)} autoFocus/>
      <button className="todo-list-button" onClick={() => {confirmTaskEditing(id)}}>
        <img src={done} alt=""/>
      </button>
      <button className="todo-list-button" onClick={() => {cancelTaskEditing()}}>
        <img src={close} alt=""/>
      </button>
    </div>
  </div>
  )
}

export default TextInput;