import { useState } from "react";

function usePersonalizado() {
    const[tasks, setTasks] = useState([]);
    const createTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };
    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };
    const updateTask = (taskId, updatedData) => {
        const updatedTasks = tasks.map((task) => {
            if(task.id === taskId){
                return { ...task, ...updatedData };
            }
            return task;
        });
        setTasks(updatedTasks);
    };
    return {
        createTask,
        deleteTask,
        updateTask,
        tasks,
    };
}
export default usePersonalizado;