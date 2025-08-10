const { connectToDb } = require('../models')

class UserModel {
  async getUsers() {
    const connection = await connectToDb();

    const [users] = await connection.query('SELECT * FROM users');

    await connection.end();

    return users;

  }

  async getUserById(id) {
    const connection = await connectToDb();

    const [users] = await connection.query(`SELECT * FROM users WHERE id = ${id}`);

    await connection.end();

    return users
  }

  async createUser(userData) {
    const { name, email, nickname, password } = userData;

    const connection = await connectToDb();

    const [result] = await connection.query(`
      INSERT INTO 
        users (name, email, nickname, password) 
      VALUES (?, ?, ?, ?)`,
      [name, email, nickname, password]
    );

    await connection.end();

    return result;
  }
}

module.exports = new UserModel();