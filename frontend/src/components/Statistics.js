import React from 'react';

function Statistics({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const highPriority = tasks.filter(task => task.priority === 'high' && !task.completed).length;
  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  }).length;

  return (
    <div className="statistics">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <div className="stat-value">{totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <div className="stat-value">{completedTasks}</div>
          <div className="stat-label">Completed</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">⏳</div>
        <div className="stat-content">
          <div className="stat-value">{activeTasks}</div>
          <div className="stat-label">Active</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">📈</div>
        <div className="stat-content">
          <div className="stat-value">{completionRate}%</div>
          <div className="stat-label">Completion</div>
        </div>
      </div>

      {highPriority > 0 && (
        <div className="stat-card alert">
          <div className="stat-icon">🔴</div>
          <div className="stat-content">
            <div className="stat-value">{highPriority}</div>
            <div className="stat-label">High Priority</div>
          </div>
        </div>
      )}

      {overdueTasks > 0 && (
        <div className="stat-card alert">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <div className="stat-value">{overdueTasks}</div>
            <div className="stat-label">Overdue</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Statistics;
