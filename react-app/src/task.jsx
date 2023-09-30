import { useState } from 'react';

export default function Task(props) {
  let [editMode, setEditMode] = useState(false);
  let [task, setTask] = useState({
    id: props.id,
    title: props.taskName,
    isCompleted: props.isCompleted,
  });

  function onTaskTitleChanged(event) {
    setTask({ ...task, title: event.target.value });
  }

  function onCheckboxClicked(event) {
    props.taskUpdated({ ...task, isCompleted: !task.isCompleted });
  }
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={task.isCompleted}
                onChange={onCheckboxClicked}
              />
            </div>
            {editMode ? (
              <input
                type="text"
                value={task.title}
                onChange={onTaskTitleChanged}
              />
            ) : (
              <h6> {task.id + ' ' + task.title}</h6>
            )}

            {editMode ? (
              <button
                className="btn btn-success"
                onClick={() => {
                  setEditMode(false);
                  props.taskUpdated(task);
                }}
              >
                Save
              </button>
            ) : (
              <button
                className="btn 
              btn-primary"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Edit
              </button>
            )}

            <button
              onClick={() => {
                props.taskDeleted(task);
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
