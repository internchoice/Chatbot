// import axios from 'axios';

// export const sendMessageToBot = async (userMessage) => {
//   try {
//     const response = await axios.post('http://localhost:5000/api/chat', {
//       message: userMessage,
//     });

//     return response.data.reply;
//   } catch (error) {
//     console.error('Frontend Error:', error);
//     return 'Oops! Something went wrong.';
//   }
// };

import axios from 'axios';

export const sendMessageToBot = async (userMessage, model) => {
  try {
    const response = await axios.post('https://chatbot-gk4q.onrender.com/api/chat', {
      message: userMessage,
      model: model
    });

    return response.data.reply;
  } catch (error) {
    console.error('Error:', error);
    return 'Oops! Something went wrong.';
  }
};
