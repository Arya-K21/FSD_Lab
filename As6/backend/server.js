import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory "Database"
let projects = [
  {
    id: '1',
    title: 'Weather Prediction App',
    description: 'A machine-learning powered web app that predicts weather using a FastAPI backend with a React frontend. Integrates with a Random Forest model for real-time classification.',
    tags: ['React', 'FastAPI', 'Python', 'ML'],
    github: 'https://github.com',
    live: '',
    color: '#00f5d4',
  },
  {
    id: '2',
    title: 'Meal Prep PWA',
    description: 'A Progressive Web App for managing weekly meal plans, macro tracking, and grocery lists. Features JWT auth, per-user data isolation, and offline support.',
    tags: ['React', 'Node.js', 'Express', 'PWA'],
    github: 'https://github.com',
    live: '',
    color: '#bf5af2',
  },
  {
    id: '3',
    title: 'Student Portal REST API',
    description: 'Full-stack student data management system with CRUD operations, form validation, and admin panel.',
    tags: ['Node.js', 'Express', 'REST API', 'JavaScript'],
    github: 'https://github.com',
    live: '',
    color: '#0a84ff',
  },
];

// Routes
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const newProject = req.body;
  // Make sure it has an ID
  if (!newProject.id) {
    newProject.id = Date.now().toString();
  }
  projects.push(newProject);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const index = projects.findIndex(p => p.id === id);
  
  if (index !== -1) {
    projects[index] = { ...projects[index], ...req.body, id };
    res.json(projects[index]);
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = projects.length;
  projects = projects.filter(p => p.id !== id);
  
  if (projects.length < initialLength) {
    res.json({ message: 'Project deleted' });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
