import React, { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onUpdate, isSelected, onSelect }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority || 'medium');
  const [editCategory, setEditCategory] = useState(task.category || '');
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');

  const handleUpdate = () => {
    if (!editTitle.trim()) {
      alert('Task title cannot be empty');
      return;
    }

    onUpdate(task._id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      category: editCategory.trim(),
      dueDate: editDueDate || null,
      completed: task.completed
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditPriority(task.priority || 'medium');
    setEditCategory(task.category || '');
    setEditDueDate(task.dueDate || '');
    setIsEditing(false);
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null;
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'Overdue', class: 'overdue' };
    if (diffDays === 0) return { text: 'Due Today', class: 'due-today' };
    if (diffDays === 1) return { text: 'Due Tomorrow', class: 'due-soon' };
    if (diffDays <= 3) return { text: `Due in ${diffDays} days`, class: 'due-soon' };
    return { text: `Due ${due.toLocaleDateString()}`, class: 'due-later' };
  };

  const dueDateStatus = getDueDateStatus(task.dueDate);

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="task-edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-input"
            autoFocus
            placeholder="Task title"
          />
          
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="edit-textarea"
            placeholder="Description"
            rows="2"
          />

          <div className="edit-meta">
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="edit-select"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>

            <input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="edit-input"
              placeholder="Category"
            />

            <input
              type="date"
              value={editDueDate ? editDueDate.split('T')[0] : ''}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="edit-input"
            />
          </div>

          <div className="edit-actions">
            <button onClick={handleUpdate} className="btn btn-success">
              💾 Save
            </button>
            <button onClick={handleCancel} className="btn btn-secondary">
              ✕ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isSelected ? 'selected' : ''} priority-${task.priority || 'medium'}`}>
      <div className="task-select">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(task._id)}
          className="select-checkbox"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
          className="task-checkbox"
        />
        <div className="task-details">
          <div className="task-header">
            <h3 className="task-title">
              {getPriorityIcon(task.priority)} {task.title}
            </h3>
            <div className="task-meta">
              {task.category && (
                <span className="task-category">📁 {task.category}</span>
              )}
              {dueDateStatus && !task.completed && (
                <span className={`task-due-date ${dueDateStatus.class}`}>
                  📅 {dueDateStatus.text}
                </span>
              )}
            </div>
          </div>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-edit"
          title="Edit task"
        >
          ✏️
        </button>
        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this task?')) {
              onDelete(task._id);
            }
          }}
          className="btn btn-delete"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;