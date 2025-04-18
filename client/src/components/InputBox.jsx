import React, { useState } from 'react';

const InputBox = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className="d-flex">
      <input
        className="form-control me-2 input"
        type="text"
        value={text}
        placeholder="Type a message..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button className="btn btn-primary send" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default InputBox;
