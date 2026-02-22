const express = require('express');
const ChatbotModel = require('../models/chatbot.model');
const { generateAiResponse } = require('../services/ai');

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

router.get('/chats/:chatId/messages', async function (req, res) {
  const messages = await ChatbotModel.getChat(req.params.chatId);

  return res.json({
    data: messages,
  });
});

router.post('/chats/:chatId/messages', async function (req, res) {
  const prompt = req.body.prompt;

  const isLimit = await ChatbotModel.checkChatLimit({ user_id: 1 });

  if (isLimit.isLimit) {
    return res.status(429).json({
      status: false,
      message: `You are in limit. Try again after ${isLimit.nextLimit}.`
    })
  }

  await ChatbotModel.insertMessage({
    chat_id: req.params.chatId,
    type: 'user',
    content: prompt,
  });

  const contentAI = await generateAiResponse(prompt);

  await ChatbotModel.insertMessage({
    chat_id: req.params.chatId,
    type: 'bot',
    content: contentAI,
  });

  await ChatbotModel.updateHistoryChat({ user_id: 1 });

  return res.json({
    status: true,
    data: {
      prompt: prompt,
      answer: contentAI,
      // detail: response.data,
    },
  });
});

module.exports = router;
