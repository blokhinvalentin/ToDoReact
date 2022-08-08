import { ShowError } from '../';
import './style.scss';

const AddTaskField = ({ error, addNewTask, text, setText }) => (
  <div className="todo-list__add-task-field">
    <h1>To-Do List</h1>

    <div className="add-task">
      <input
        type="text"
        id="task-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      
      <button type="button" onClick={addNewTask}>Add</button>
    </div>

    <ShowError errorMessage={error} />
  </div>
);

export default AddTaskField;
