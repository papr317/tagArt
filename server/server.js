const express = require("express");
const cors = require("cors");
const { sql, connectToDB } = require("./db");
const app = express();
const port = 3000;

// Middleware для парсинга JSON
app.use(cors());
app.use(express.json());
let pool;

const Connect = async () => {
  await connectToDB()
    .then((p) => {
      pool = p;
    })
    .catch((err) => console.error(err));
};
// connectToDB()
//   .then((p) => {
//     pool = p;
//   })
//   .catch((err) => console.error(err));

app.get("/api/users", async (req, res) => {
  await Connect();
  try {
    const result = await pool
      .request()
      .query(
        "SELECT TOP (100) [id] , [name] FROM [uipathbots].[dbo].[temp666]"
      );
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Временное хранилище данных
let todos = [
  { id: 1, title: "Сделать задание", completed: false },
  { id: 2, title: "Проверить почту", completed: true },
  { id: 3, title: "Позвонить другу", completed: true },
  { id: 4, title: "Поспать", completed: true },
  { id: 5, title: "поесть ", completed: false },
  { id: 6, title: "попить ", completed: false },
  
];

app.get("/api/todos", (req, res) => {
  res.set("X-Custom-Header", "value");
  res.json(todos);
});

// GET /todos/:id — получить задачу по ID
app.get("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Задача не найдена" });
  }
});

// POST /todos — добавить задачу
app.post("/api/todos", (req, res) => {
  const { title, completed = false } = req.body;
  console.log(req.body);
  const newTodo = { id: Date.now(), title, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id — обновить задачу
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  console.log(req.body);
  console.log(id);
  console.log(index);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: "Задача не найдена" });
  }
});

// DELETE /todos/:id — удалить задачу
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) {
    const deleted = todos.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Задача не найдена" });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен: http://localhost:${port}`);
});












// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3000;

// // Модель картины
// let paintings = [
//   {
//     id: 1,
//     image: 'https://example.com/image1.jpg',
//     author: 'Иван Иванов',
//     description: 'Пейзаж с озером',
//     date: '2023-04-01',
//     price: 1200,
//   },
// ];

// // Middleware
// app.use(cors());
// app.use(express.json());

// // GET: Все картины
// app.get('/api/paintings', (req, res) => {
//   res.json(paintings);
// });

// // GET: Одна картина по ID
// app.get('/api/paintings/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const painting = paintings.find((p) => p.id === id);
//   painting ? res.json(painting) : res.status(404).json({ message: 'Не найдено' });
// });

// // POST: Добавить картину
// app.post('/api/paintings', (req, res) => {
//   const { image, author, description, date, price } = req.body;
//   const newPainting = {
//     id: Date.now(),
//     image,
//     author,
//     description,
//     date,
//     price,
//   };
//   paintings.push(newPainting);
//   res.status(201).json(newPainting);
// });

// // PUT: Обновить картину
// app.put('/api/paintings/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = paintings.findIndex((p) => p.id === id);
//   if (index !== -1) {
//     paintings[index] = { ...paintings[index], ...req.body };
//     res.json(paintings[index]);
//   } else {
//     res.status(404).json({ message: 'Не найдено' });
//   }
// });

// // DELETE: Удалить картину
// app.delete('/api/paintings/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = paintings.findIndex((p) => p.id === id);
//   if (index !== -1) {
//     const deleted = paintings.splice(index, 1);
//     res.json(deleted[0]);
//   } else {
//     res.status(404).json({ message: 'Не найдено' });
//   }
// });

// // Запуск сервера
// app.listen(port, () => {
//   console.log(`TagArt API: http://localhost:${port}`);
// });
