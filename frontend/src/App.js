import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/Taskform';
import SearchBar from './components/SearchBar';
import Statistics from './components/Statistics';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, completed
  const [filterPriority, setFilterPriority] = useState('all'); // all, high, medium, low
  const [darkMode, setDarkMode] = useState(false);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
      // Cache tasks in localStorage
      localStorage.setItem('tasks_cache', JSON.stringify(response.data));
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks. Make sure the backend is running.');
      // Load from cache if available
      const cached = localStorage.getItem('tasks_cache');
      if (cached) {
        setTasks(JSON.parse(cached));
        setError('Showing cached tasks. Backend is offline.');
      }
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

  // Bulk delete tasks
  const bulkDeleteTasks = async (ids) => {
    try {
      await Promise.all(ids.map(id => axios.delete(`${API_URL}/${id}`)));
      setTasks(tasks.filter(task => !ids.includes(task._id)));
      setError('');
    } catch (err) {
      setError('Failed to delete tasks.');
      console.error('Error deleting tasks:', err);
    }
  };

  // Toggle task completion
  const toggleComplete = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (task) {
      await updateTask(id, { ...task, completed: !task.completed });
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  // Filter and search tasks
  const getFilteredTasks = () => {
    let filtered = [...tasks];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by status
    if (filterStatus === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filterStatus === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    // Filter by priority
    if (filterPriority !== 'all') {
      filtered = filtered.filter(task => task.priority === filterPriority);
    }

    return filtered;
  };

  useEffect(() => {
    fetchTasks();
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const filteredTasks = getFilteredTasks();

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <header className="app-header">
          <div className="header-content">
            <div>
              <h1>📝 Task Manager Pro</h1>
              <p>Organize your tasks efficiently</p>
            </div>
            <button onClick={toggleDarkMode} className="theme-toggle">
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {error && (
          <div className={`error-message ${error.includes('cached') ? 'warning' : ''}`}>
            {error}
          </div>
        )}

        <Statistics tasks={tasks} />

        <TaskForm onSubmit={createTask} />

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
        />

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleComplete}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onBulkDelete={bulkDeleteTasks}
          />
        )}

        {!loading && filteredTasks.length === 0 && !error && (
          <div className="empty-state">
            {searchQuery || filterStatus !== 'all' || filterPriority !== 'all' ? (
              <p>🔍 No tasks match your filters.</p>
            ) : (
              <p>🎉 No tasks yet! Add one above to get started.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;