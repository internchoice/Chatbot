import React from 'react';
import './ChatWindow.css'; // Custom styles

const ChatWindow = ({ messages, isTyping }) => {
  return (
    <div className="chat-window">
      <div className="chat-header text-center mb-3">
        <h5 className="chat-title">Chat with AI</h5>
      </div>
      
      <div className="message-container">
        {messages.map((msg, i) => (
          <div key={i} className={`d-flex mb-3 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
            <div className={`message-bubble p-3 rounded-4 ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'}`}>
              {msg.type === 'explanation' ? (
                <div className="explanation">
                  <p>{msg.text}</p>
                </div>
              ) : (
                <div className="code">
                  <pre className="code-block">{msg.text}</pre>
                </div>
              )}
              {/* <div className="message-time text-muted mt-1 small">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {isTyping && (
        <div className="text-muted fst-italic text-center mt-3 typing-indicator">
          <span className="typing-dots">...</span> InternBot is typing...
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
