// server/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mistral-7b-instruct:free',  // ✅ updated model ID
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',  // important for OpenRouter
          'X-Title': 'React Chatbot',
        },
      }
    );

    const botReply = response.data.choices[0].message.content;
    res.json({ reply: botReply });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch response from OpenRouter.' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
