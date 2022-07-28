import { useEffect, useState } from 'react';
import Task from '../Task/Task';
import './style.scss';

const ShowTasks = ({ tasks, setTasks, error, setError }) => {
  useEffect(() => {
    setTasks(tasks);
  }, [tasks])

  return (
    <div className="todo-list__content-page">{tasks.map(task => 
      <Task key={task._id} 
        tasks={tasks} 
        setTasks={setTasks} 
        task={task} 
        erorr={error} 
        setError={setError}/>
      )}
    </div>
  )
}

export default ShowTasks;