const express = require('express');
const { connectToDb } = require('./models');

const app = express();

app.get('/', function (request, response) {
  response.send('Halo Dunia!');
})

app.get('/about', function (req, res) {
  res.send('<h2 style="color: skyblue;">HALO INI ABOUT PAGE</h2>');
})

app.get('/users', async function (req, res) {
  const connection = await connectToDb();
  
  const [users] = await connection.query('SELECT * FROM users');

  await connection.end();
  
  return res.send(`
    <pre>${JSON.stringify(users, null, 2)}</pre>  
  `)
})

app.get('/users/:id', async function (req, res) {
  const connection = await connectToDb();
  
  const [users] = await connection.query(`SELECT * FROM users WHERE id = ${req.params.id}`);

  await connection.end();
  
  return res.send(`
    <pre>${JSON.stringify(users, null, 2)}</pre>  
  `)
})

// TODO: buat endpoint yang sama untuk menampilkan data todos dan categories

app.listen(5000, function () {
  console.log('Server is running on http://localhost:5000');
});