const { connectToDb } = require('.');

class ChatbotModel {
  async getChats(userId) {
    const connection = await connectToDb();

    const [chats] = await connection.query(
      `SELECT
      * FROM chats WHERE user_id = ?`,
      [userId]
    );

    await connection.end();

    return chats;
  }

  async createChat(chatData) {
    const user_id = chatData.user_id;
    const title = chatData.title || 'New Chat';

    const connection = await connectToDb();

    const [result] = await connection.query(
      `INSERT INTO chats (user_id, title) VALUES (?, ?)`,
      [user_id, title]
    );
    
    await connection.end();

    return {
      id: result.insertId,
      user_id,
      title,
    };
  }
}

module.exports = new ChatbotModel();
