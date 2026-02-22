const { default: axios } = require('axios');
const { GEMINI_API_KEY } = require('../config/config')

const generateAiResponse = async (prompt) => {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const contentAI = response.data.candidates[0].content.parts[0].text;

  return contentAI;
};

module.exports = {
  generateAiResponse,
};
