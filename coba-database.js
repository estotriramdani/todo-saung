const mysql = require('mysql2/promise');
const DB = require('./config/config');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: DB.DB_HOST,
      user: DB.DB_USER,
      password: DB.DB_PASSWORD,
      database: DB.DB_NAME,
      port: DB.DB_PORT,
    });
    console.log('Connected to the database');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

const main = async () => {
  const connection = await connectToDatabase();

  const [users] = await connection.query('SELECT * FROM users');
  console.log('Users:', users);

  const [todos] = await connection.query('SELECT * FROM todos');
  console.log('Todos:', todos);

  const [combinedTodos] = await connection.query(`
SELECT 
	todos.id, 
	todos.title, 
	todos.description, 
	todos.is_completed, 
	todos.due_date,
	todos.user_id,
	users.name AS user_name,
	categories.id AS category_id,
	categories.category_name AS category_name
FROM 
	todos 
	JOIN users ON users.id = todos.user_id
	JOIN categories ON todos.category_id = categories.id
WHERE 
	user_id = 1;`);
  console.log('combinedTodos:', combinedTodos);

  await connection.end();
};

main();
