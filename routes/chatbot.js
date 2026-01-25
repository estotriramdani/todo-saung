const express = require('express');
const ChatbotModel = require('../models/chatbot.model');

const router = express.Router();

router.get('/chats', async function (req, res) {
  // TODO: ambil user id dari auth nanti
  const chatsDb = await ChatbotModel.getChats(1);

  const chats = chatsDb.map((chat) => {
    return {
      id: chat.id,
      title: chat.title,
    };
  });

  return res.status(200).json({
    data: chats,
  });
});

router.post('/chats', async function (req, res) {
  const chatData = {
    user_id: 1, // TODO: ambil user id dari auth nanti
    title: req.body.title,
  };

  const newChat = await ChatbotModel.createChat(chatData);

  return res.status(201).json({
    data: newChat,
  });
});

module.exports = router;
