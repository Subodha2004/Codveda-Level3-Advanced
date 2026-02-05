import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks. Make sure the backend is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create new task
  const createTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      setTasks([...tasks, response.data]);
      setError('');
    } catch (err) {
      setError('Failed to create task.');
      console.error('Error creating task:', err);
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, taskData);
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      setError('');
    } catch (err) {
      setError('Failed to update task.');
      console.error('Error updating task:', err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete task.');
      console.error('Error deleting task:', err);
    }
  };

  // Toggle task completion
  const toggleComplete = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (task) {
      await updateTask(id, { ...task, completed: !task.completed });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>📝 Task Manager</h1>
          <p>Manage your daily tasks efficiently</p>
        </header>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <TaskForm onSubmit={createTask} />

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={toggleComplete}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        )}

        {!loading && tasks.length === 0 && !error && (
          <div className="empty-state">
            <p>🎉 No tasks yet! Add one above to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;