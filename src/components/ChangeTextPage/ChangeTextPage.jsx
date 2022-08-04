import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShowError } from '../index';
import { getTasks, confirmTaskEditing } from '../../service/requests';
import done from '../../img/done.svg';
import close from '../../img/close.svg';
import './style.scss';

const TaskEditing = () => {
  const { id } = useParams();
  const [task, setTask] = useState({});
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getTask = async () => {
    const resp = await getTasks();
    if (resp.statusText === "OK") {
      for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i]._id === id) {
          setTask(resp.data[i]);
          setText(resp.data[i].text);
          break;
        }
      }
    }
  };

  const saveTaskEditing = async (id) => {
    try {
      const resp = await confirmTaskEditing(id, text);
      if (resp.statusText === "OK") {
        navigate("/tasks");
        setTask(resp.data);
      }
    } catch (error) {
      setError("unable to update text");
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="todo-list__single-page">
      <ShowError errorMessage={error} />

      <div
        className="todo-list__task-container container__unchecked"
        id={`container-${id}`}
      >
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={task.text}
          autoFocus
        />
        <button
          className="todo-list-button"
          onClick={() => saveTaskEditing(id)}
        >
          <img src={done} alt="" />
        </button>
        <button className="todo-list-button" onClick={() => navigate("/tasks")}>
          <img src={close} alt="" />
        </button>
      </div>
      
    </div>
  );
};

export default TaskEditing;
