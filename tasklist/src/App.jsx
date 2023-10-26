import { useState } from 'react'
import React from 'react'
import usePersonalizado from '../componentes/usePersonalizado'
import './App.css'

function App() {
  const { createTask, deleteTask, updateTask, tasks } = usePersonalizado();

  const handleCreateTask = () => {
    createTask({ id: tasks.length +1, title: 'New Task', completed: false});
  };
  

  return (
    <div>
      <button onClick={handleCreateTask}>Create Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => updateTask(task.id, {completed: !task.completed})}>
              {task.completed ? 'Marcar como no completada':'Marcar como completada'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
