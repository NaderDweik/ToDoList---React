import React, { useState, useEffect } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [animationMap, setAnimationMap] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleInputChange = (e) => setNewTask(e.target.value);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks((prev) => [...prev, newTask.trim()]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerAnimation = (index, direction) => {
    setAnimationMap((prev) => ({
      ...prev,
      [index]: direction === 'up' ? 'move-up' : 'move-down',
    }));
    setTimeout(() => {
      setAnimationMap((prev) => {
        const newMap = { ...prev };
        delete newMap[index];
        return newMap;
      });
    }, 600);
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updated = [...tasks];
      [updated[index], updated[index - 1]] = [updated[index - 1], updated[index]];
      setTasks(updated);
      triggerAnimation(index - 1, 'up');
    }
  };

  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updated = [...tasks];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      setTasks(updated);
      triggerAnimation(index + 1, 'down');
    }
  };

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.body.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  

  // Drag and drop handlers
  const handleDragStart = (index) => setDraggedIndex(index);

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const updated = [...tasks];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, movedItem);
    setTasks(updated);
    setDraggedIndex(null);
  };

  return (
<div className="ToDoList">
      <h1>📝 To - Do - List</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="✏️ Enter a Task ..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="Add-Button" onClick={handleAddTask}>➕ Add A Task</button>
        <button className="Toggle-Mode" onClick={toggleTheme}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={animationMap[index] || ''}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
          >
            <span className="text">📁 {task}</span>
            <div className="button-group">
              <button className="Delete-Button" onClick={() => handleDeleteTask(index)}>🗑️</button>
              <button className="Up-Button" onClick={() => moveTaskUp(index)}>⬆️</button>
              <button className="Down-Button" onClick={() => moveTaskDown(index)}>⬇️</button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
