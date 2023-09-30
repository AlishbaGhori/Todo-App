import Task from './task';
import { useState } from 'react';

export default function Todo() {
  let [tasks, setTasks] = useState([]);
  let [newTitle, setNewTitle] = useState('');
  let completedTasks = [...tasks.filter((task) => task.isCompleted)];
  let incompleteTasks = [...tasks.filter((task) => !task.isCompleted)];
  function addTask(event) {
    event.preventDefault();

    let newTask = {
      id: tasks.length + 1,
      title: newTitle,
      date: new Date(),
      isCompleted: true,
    };

    setTasks([...tasks, newTask]);
    setNewTitle('');
    console.log(tasks);
  }

  function handleInputChange(event) {
    setNewTitle(event.target.value);
  }

  function onTaskUpdated(updatedTask) {
    let updatedTasks = tasks.map((currentTask) => {
      if (currentTask.id === updatedTask.id) {
        return updatedTask;
      } else {
        return currentTask;
      }
    });
    setTasks([...updatedTasks]);
  }

  function onTaskDeleted(deletedTask) {
    let filteredTasks = tasks.filter((task) => {
      if (task.id !== deletedTask.id) {
        return task;
      }
    });

    setTasks(filteredTasks);
  }

  return (
    <>
      <div className="container">
        <div className="card mt-2">
          <div className="card-header">
            <div className="card-title">
              <h1 className="text-primary">Todo App</h1>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <form
                className="d-flex justify-content-between mb-3"
                onSubmit={addTask}
              >
                <input
                  type="text"
                  value={newTitle}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />

                <input className="btn btn-primary mx-1" type="submit" />
              </form>
            </div>
            <h3>Incomplete Tasks</h3>
            {incompleteTasks.map((task) => (
              <Task
                key={task.id}
                taskName={task.title}
                id={task.id}
                isCompleted={task.isCompleted}
                taskUpdated={onTaskUpdated}
                taskDeleted={onTaskDeleted}
              />
            ))}
            <h3>Completed Tasks</h3>
            {completedTasks.map((task) => (
              <Task
                key={task.id}
                taskName={task.title}
                id={task.id}
                isCompleted={task.isCompleted}
                taskUpdated={onTaskUpdated}
                taskDeleted={onTaskDeleted}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
