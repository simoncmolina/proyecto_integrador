const express = require('express')
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

app.use(bodyParser.json());

const tasks = [];

app.post('/taskslist', (req, res) => {
    const { description } = req.body;
    if(!description) {
        return res.status(400).json({
            error:'Description is mandatory'
        });
    }

    const newTask = {
        id: tasks.length + 1,
        description,
        completed: false,
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});
app.get('/taskslist', (req, res) => {
    res.status(200).json(tasks);
});

app.get('/taskslist/completed', (req, res) => {
    const completedTasks = tasks.filter(task => task.completed);
    res.status(200).json(completedTasks);
});

app.get('/taskslist/incomplete', (req, res) => {
    const incompleteTasks = tasks.filter(task => !task.completed);
    res.status(200).json(incompleteTasks);
});

app.get('/taskslist/:tId', (req, res) => {
    const tId = parseInt(req.params.tId);
    const task = tasks.find(task => task.id === tId);

    if(!task) {
        return res.status(404).json({
            error:'Task not found'
        });
    }
    res.status(200).json(task);
});

app.put('/taskslist/:tId', (req, res) => {
    const tId = parseInt(req.params.tId);
    const task = tasks.find(task => task.id === tId);
    
    if(!task) {
        return res.status(404).json({
            error:'Task not found'
        });
    }
    const { description, completed } = req.body;
    if(description){
        task.description = description;
    }
    if(completed !== undefined){
        task.completed = completed;
    }
    res.status(200).json(task);
    
});

app.delete('/taskslist/:tId', (req, res) => {
    const tId = parseInt(req.params.tId);
    const taskIndex = tasks.findIndex(task => task.id === tId);

    if(taskIndex === -1){
        return res.status(404).json({
            error: 'task not found'
        });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`API running on port ${port}`);
});