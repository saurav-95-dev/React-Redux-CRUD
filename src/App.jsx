import React, { useState, useMemo } from 'react';

// TodoApp Component
export default function TodoApp() {
  // State to keep track of the task input and the list of tasks
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  // Function to add a new task
  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { id: tasks.length + 1, text: taskInput, completed: false }]);
      setTaskInput(''); // Reset input field after adding the task
    }
  };

  // Function to toggle completion status of a task
  const toggleCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Expensive calculation: Filter completed tasks (we'll memoize this)
  const completedTasks = useMemo(() => {
    console.log('Filtering completed tasks...');
    return tasks.filter(task => task.completed);
  }, [tasks]); // Recalculate only when the `tasks` array changes

  return (
    <div>
      <h1>To-Do App</h1>

      {/* Task input and add button */}
      <div>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* List of tasks */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleCompletion(task.id)}
            >
              {task.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Show filtered completed tasks */}
      <h3>Completed Tasks:</h3>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}
