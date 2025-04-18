const axios = require('axios');
require('dotenv').config();

(async () => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openrouter/chatgpt',
        messages: [{ role: 'user', content: 'Hello from standalone test!' }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          Referer: 'http://localhost:3000',
          'X-Title': 'Standalone Test',
        },
      }
    );

    console.log('✅ Reply:', response.data.choices[0].message.content);
  } catch (err) {
    console.error('❌ Standalone Error:', err.response?.data || err.message);
  }
})();
