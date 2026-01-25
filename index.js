const express = require('express')
const path = require('path')
const { connectToDb } = require('./models')
const userRouter = require('./routes/users')
const todoRouter = require('./routes/todos')
const ollamaRouter = require('./routes/ollama')
const authRouter = require('./routes/auth')
const chatbotRouter = require('./routes/chatbot')
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(express.json());

app.use(cors())

// Tujuan: untuk serving static asset (javascript, css, dll)
app.use(express.static('public'));

// ===== API =====
app.use('/api/auth', authRouter)

app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);

app.get('/api/categories', async function (req, res) {
  const connection = await connectToDb();

  const [categories] = await connection.query('SELECT * FROM categories');

  await connection.end();

  return res.json(categories);
})

app.get('/api/categories/:id', async function (req, res) {
  const connection = await connectToDb();

  const [categories] = await connection.query(`SELECT * FROM categories WHERE id = ${req.params.id}`);

  await connection.end();

  return res.json(categories);
})

app.use('/api/ollama', ollamaRouter);

app.use('/api/chatbot', chatbotRouter)

// ===== FRONTEND =====

app.get('/todos', async function (req, res) {
  return res.sendFile(path.join(__dirname, './views/todos/index.html'))
});

app.use('/', proxy('localhost:5173'));

app.listen(5000, function () {
  console.log('Server is running on http://localhost:5000');
});