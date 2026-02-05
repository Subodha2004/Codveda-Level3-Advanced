import React, { useState } from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete, onUpdate, onBulkDelete }) {
  const [selectedTasks, setSelectedTasks] = useState([]);

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const toggleSelectTask = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const selectAll = (taskList) => {
    const allIds = taskList.map(task => task._id);
    setSelectedTasks([...selectedTasks, ...allIds.filter(id => !selectedTasks.includes(id))]);
  };

  const deselectAll = () => {
    setSelectedTasks([]);
  };

  const handleBulkDelete = () => {
    if (selectedTasks.length === 0) {
      alert('No tasks selected');
      return;
    }
    
    if (window.confirm(`Delete ${selectedTasks.length} selected task(s)?`)) {
      onBulkDelete(selectedTasks);
      setSelectedTasks([]);
    }
  };

  return (
    <div className="task-list">
      {selectedTasks.length > 0 && (
        <div className="bulk-actions">
          <span className="selected-count">{selectedTasks.length} task(s) selected</span>
          <div className="bulk-buttons">
            <button onClick={deselectAll} className="btn btn-secondary btn-sm">
              Deselect All
            </button>
            <button onClick={handleBulkDelete} className="btn btn-danger btn-sm">
              🗑️ Delete Selected
            </button>
          </div>
        </div>
      )}

      {incompleteTasks.length > 0 && (
        <div className="task-section">
          <div className="section-header">
            <h2 className="section-title">
              Active Tasks ({incompleteTasks.length})
            </h2>
            {incompleteTasks.length > 1 && (
              <button 
                onClick={() => selectAll(incompleteTasks)} 
                className="btn-link"
              >
                Select All
              </button>
            )}
          </div>
          {incompleteTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
              isSelected={selectedTasks.includes(task._id)}
              onSelect={toggleSelectTask}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="task-section">
          <div className="section-header">
            <h2 className="section-title">
              Completed Tasks ({completedTasks.length})
            </h2>
            {completedTasks.length > 1 && (
              <button 
                onClick={() => selectAll(completedTasks)} 
                className="btn-link"
              >
                Select All
              </button>
            )}
          </div>
          {completedTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
              isSelected={selectedTasks.includes(task._id)}
              onSelect={toggleSelectTask}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;