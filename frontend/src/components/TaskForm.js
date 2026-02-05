import React, { useState } from 'react';

function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      completed: false
    });

    // Reset form
    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Task title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
