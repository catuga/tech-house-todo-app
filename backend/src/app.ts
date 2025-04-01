import express from 'express';
import cors from 'cors';
import { Task } from './types';
import * as fs from 'fs';
import * as path from 'path';

const app = express();
const port = 3000;

let tasks: Task[] = [];
let nextId = 1;

try {
  const tasksPath = path.join(__dirname, 'tasks.json');
  const initialTasks = JSON.parse(fs.readFileSync(tasksPath, 'utf-8'));
  tasks = initialTasks;
  nextId = Math.max(...tasks.map(task => task.id)) + 1;
} catch (error) {
  console.log('No initial tasks found, starting with empty list');
}

app.use(cors());
app.use(express.json());

app.get('/api/tasks', (req, res) => {
  const page = parseInt(req.query['page'] as string) || 1;
  const limit = 3;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const sortedTasks = [...tasks].sort((a, b) => b.id - a.id);
  const paginatedTasks = sortedTasks.slice(startIndex, endIndex);
  
  res.json({
    items: paginatedTasks,
    total: tasks.length,
    totalPages: Math.ceil(tasks.length / limit)
  });
});

app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask: Task = {
    id: nextId++,
    title,
    description: description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris, ac elementum ultrices mauris. Cursus urna vehicula nisi aliquam pulvinar sit interdum eget ac. Rhoncus et nunc, aliquam, ac faucibus odio porta diam lorem. Dictum amet malesuada dictum tristique sollicitudin sed sagittis.",
    completed: false,
    userId: 1
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = tasks.length;
  
  tasks = tasks.filter(task => task.id !== id);
  
  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  return res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});