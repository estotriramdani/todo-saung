const express = require('express');
const { connectToDb } = require('./models');
const userRouter = require('./routes/users')
const todoRouter = require('./routes/todos')

const app = express();

app.use(express.json());

app.get('/', function (request, response) {
  response.send('Halo Dunia!');
})

app.use('/users', userRouter);
app.use('/todos', todoRouter);

// app.get('/todos', async function (req, res) {
//   const connection = await connectToDb();
  
//   const [todos] = await connection.query('SELECT * FROM todos');

//   await connection.end();
  
//   return res.json(todos);
// })

// app.get('/todos/:id', async function (req, res) {
//   const connection = await connectToDb();
  
//   const [todos] = await connection.query(`SELECT * FROM todos WHERE id = ${req.params.id}`);

//   await connection.end();

//   return res.json(todos);
// })

// app.get('/todos/:id', async function (req, res) {
//   const connection = await connectToDb();

//   const [todos] = await connection.query(`SELECT * FROM todos WHERE id = ${req.params.id}`);

//   await connection.end();

//   return res.json(todos);
// })

app.get('/categories', async function (req, res) {
  const connection = await connectToDb();

  const [categories] = await connection.query('SELECT * FROM categories');

  await connection.end();

  return res.json(categories);
})

app.get('/categories/:id', async function (req, res) {
  const connection = await connectToDb();

  const [categories] = await connection.query(`SELECT * FROM categories WHERE id = ${req.params.id}`);

  await connection.end();

  return res.json(categories);
})

app.listen(5000, function () {
  console.log('Server is running on http://localhost:5000');
});