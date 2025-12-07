const express = require('express');

const router = express.Router();

// GET https://localhost:5000/api/ollama/chat
router.post('/chat', async function (req, res) {
  const content = req.body.content;

  const response = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer 4e547ad79384417e9483913cd797de25.KppK5gSYeilWKNdJk3JFmvLQ'
    },
    body: JSON.stringify({
      model: 'gpt-oss:120b-cloud',
      messages: [
        {
          role: 'user',
          content: content
        }
      ],
      stream: false,
    })
  })

  const responseJson = await response.json();

  return res.status(response.status).json(responseJson)
})

module.exports = router;
