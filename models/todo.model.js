const { connectToDb } = require('.')

class TodoModel {
  async getTodos() {
    const connection = await connectToDb();

    const [todos] = await connection.query(`
      SELECT t.*, u.name as user_name, u.nickname as user_nickname,
      c.category_name
      FROM todos t 
      LEFT JOIN users u ON t.user_id = u.id
      INNER JOIN categories c ON t.category_id = c.id
      ORDER BY t.created_at DESC
    `);

    await connection.end();

    return todos;
  }

  async getTodoById(id) {
    const connection = await connectToDb();

    const [todos] = await connection.query(`
      SELECT 
        t.*, u.name as user_name, u.nickname as user_nickname,
        c.category_name
      FROM todos t 
      LEFT JOIN users u ON t.user_id = u.id
      INNER JOIN categories c ON t.category_id = c.id
      WHERE t.id = ?
    `, [id]);

    await connection.end();

    return todos;
  }

  async getTodosByUserId(userId) {
    const connection = await connectToDb();

    const [todos] = await connection.query(`
      SELECT t.*, u.name as user_name, u.nickname as user_nickname 
      FROM todos t 
      LEFT JOIN users u ON t.user_id = u.id
      WHERE t.user_id = ?
      ORDER BY t.created_at DESC
    `, [userId]);

    await connection.end();

    return todos;
  }

  async createTodo(todoData) {
    const { user_id, title, description, due_date } = todoData;

    const connection = await connectToDb();

    const [result] = await connection.query(`
      INSERT INTO 
        todos (user_id, title, description, due_date) 
      VALUES (?, ?, ?, ?)`,
      [user_id, title, description, due_date]
    );

    await connection.end();

    return result;
  }

  async updateTodo(id, todoData) {
    const connection = await connectToDb();

    // validasi di kolom todoData tidak boleh ada ID
    if (todoData.id) {
      delete todoData.id;
    }

    // buatkan string dengan format [column] = ? => diisi dengan value
    // pembuatan string tersebut berdasarkan todoData

    let updateString = '';
    const values = [];

    Object.keys(todoData).forEach(key => {
      // memasukkan column ke updateString
      updateString += `${key} = ?,`

      // memasukkan value ke values
      values.push(todoData[key]);
    })

    /*
    Contoh: 
    {
      "title": "Updated Todo Title",
      "description": "Updated description",
      "is_completed": true
    }
    Hasilnya:
    title = ?, description = ?, is_completed = ?,

    !Koma terakhir harus dihapus
    */

    // menghapus koma
    updateString = updateString.slice(0, -1);

    values.push(id);
    
    const [result] = await connection.query(`UPDATE todos SET ${updateString} WHERE id = ?`, values);

    await connection.end();

    return result;
  }

  async deleteTodo(id) {
    const connection = await connectToDb();

    const [result] = await connection.query('DELETE FROM todos WHERE id = ?', [id]);

    await connection.end();

    return result;
  }

  async markTodoAsCompleted(id) {
    const connection = await connectToDb();

    const [result] = await connection.query(
      'UPDATE todos SET is_completed = TRUE WHERE id = ?', 
      [id]
    );

    await connection.end();

    return result;
  }

  async markTodoAsIncomplete(id) {
    const connection = await connectToDb();

    const [result] = await connection.query(
      'UPDATE todos SET is_completed = FALSE WHERE id = ?', 
      [id]
    );

    await connection.end();

    return result;
  }
}

module.exports = new TodoModel();