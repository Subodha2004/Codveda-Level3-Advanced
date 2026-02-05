import React, { useState } from 'react';

function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      category: category.trim(),
      dueDate: dueDate || null,
      completed: false
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('');
    setDueDate('');
    setShowAdvanced(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group flex-grow">
          <input
            type="text"
            placeholder="What needs to be done? *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            autoFocus
          />
        </div>
        <button 
          type="button" 
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="btn btn-icon"
          title="Advanced options"
        >
          {showAdvanced ? '▲' : '▼'}
        </button>
      </div>

      {showAdvanced && (
        <div className="advanced-options">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="form-select"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                type="text"
                placeholder="e.g., Work, Personal"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-input"
                list="categories"
              />
              <datalist id="categories">
                <option value="Work" />
                <option value="Personal" />
                <option value="Shopping" />
                <option value="Health" />
                <option value="Study" />
              </datalist>
            </div>

            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              placeholder="Add more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              rows="2"
            />
          </div>
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        ➕ Add Task
      </button>
    </form>
  );
}

export default TaskForm;