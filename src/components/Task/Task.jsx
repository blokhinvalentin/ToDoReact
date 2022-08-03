import edit from "../../img/edit.svg";
import close from "../../img/close.svg";
import "./style.scss";

const Task = ({ task, handleCheckbox, removeTask, editTask }) => {
  return (
    <div
      className={
        task.isCheck
          ? "todo-list__task-container__checked"
          : "todo-list__task-container__unchecked"
      }
      id={`container-${task._id}`}
    >
      <input
        type="checkbox"
        onChange={() => handleCheckbox(task._id, task.isCheck)}
        checked={task.isCheck}
      />
      <p
        className={
          task.isCheck
            ? "todo-list__text-task todo-list__done-text"
            : "todo-list__text-task"
        }
      >
        {task.text}
      </p>
      <button
        type="button"
        className={task.isCheck ? "todo-list__hide" : "todo-list-button edit"}
        onClick={() => editTask(task._id)}
        taskid={task._id}
      >
        <img src={edit} alt="" />
      </button>

      <button
        type="button"
        className="todo-list-button delete"
        onClick={() => removeTask(task._id)}
      >
        <img src={close} alt="" />
      </button>
    </div>
  );
};

export default Task;
