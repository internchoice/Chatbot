import React from 'react';
import './MessageBubble.css'; // Optional custom styles

const MessageBubble = ({ message, isUser }) => {
  return (
    <div className={`message-bubble-container ${isUser ? 'user' : 'bot'}`}>
      <div
        className={`message-bubble p-3 rounded-3 ${isUser ? 'bg-primary text-white' : 'bg-light text-dark'}`}
        style={{
          maxWidth: '80%', // Sets the maximum width of the bubble
          boxShadow: isUser
            ? '0 4px 10px rgba(0, 123, 255, 0.2)' // Adds a shadow for user messages
            : '0 4px 10px rgba(0, 0, 0, 0.1)', // Adds a shadow for bot messages
        }}
      >
        {message} {/* Displays the actual message text */}
      </div>
    </div>
  );
};

export default MessageBubble;
