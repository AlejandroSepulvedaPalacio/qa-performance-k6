const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample data (in-memory)
let data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];

// GET - Read all items
app.get('/items', (req, res) => {
  res.json(data);
});

// GET - Read a specific item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = data.find(item => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// POST - Create a new item
app.post('/items', (req, res) => {
  const newItem = {
    id: data.length + 1,
    name: req.body.name
  };
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT - Update an existing item
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = data.findIndex(item => item.id === itemId);

  if (itemIndex > -1) {
    data[itemIndex] = { ...data[itemIndex], ...req.body };
    res.json(data[itemIndex]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// DELETE - Delete an item
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  data = data.filter(item => item.id !== itemId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
