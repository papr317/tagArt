const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Модель картины
let paintings = [
  {
    id: 1,
    image: 'https://example.com/nft1.jpg',
    author: 'Satoshi Nakamoto',
    description: 'Цифровой рассвет',
    date: '2025-07-28',
    price: 2500,
  },
];

// Middleware
app.use(cors());
app.use(express.json());

// GET: Все картины
app.get('/api/paintings', (req, res) => {
  res.json(paintings);
});

// POST: Добавить картину
app.post('/api/paintings', (req, res) => {
  const { image, author, description, date, price } = req.body;
  const newPainting = {
    id: Date.now(),
    image,
    author,
    description,
    date,
    price,
  };
  paintings.push(newPainting);
  res.status(201).json(newPainting);
});

// PUT: Обновить картину
app.put('/api/paintings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = paintings.findIndex((p) => p.id === id);
  if (index !== -1) {
    paintings[index] = { ...paintings[index], ...req.body };
    res.json(paintings[index]);
  } else {
    res.status(404).json({ message: 'Картина не найдена' });
  }
});

// DELETE: Удалить картину
app.delete('/api/paintings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = paintings.findIndex((p) => p.id === id);
  if (index !== -1) {
    const deleted = paintings.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: 'Картина не найдена' });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`TagArt API запущен: http://localhost:${port}`);
});
