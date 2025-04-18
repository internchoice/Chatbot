import React, { useState, useEffect, useRef } from 'react';
import ChatWindow from './components/ChatWindow';
import InputBox from './components/InputBox';
import { sendMessageToBot } from './services/chatbotAPI';
import jsPDF from 'jspdf';
import './App.css';  // Custom styles

const App = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');

  // Ref for the chat window container to handle auto-scroll
  const chatWindowRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async (text) => {
    const userMessage = { text, sender: 'user', timestamp: new Date() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsTyping(true);

    const botText = await sendMessageToBot(text, selectedModel);
    const botMessage = { text: botText, sender: 'bot', timestamp: new Date() };
    setMessages([...newMessages, botMessage]);
    setIsTyping(false);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
  };

  const handleExport = (format) => {
    const data = messages.map(msg =>
      `${msg.sender === 'user' ? 'You' : 'Bot'}: ${msg.text}`
    ).join('\n');
  
    if (format === 'txt') {
      const blob = new Blob([data], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'chat_history.txt';
      link.click();
    } else if (format === 'pdf') {
      const doc = new jsPDF();
      
      const margins = { top: 20, left: 10, bottom: 20, right: 10 }; // Smaller margins
      const maxWidth = 180;  // Maximum width for the text
      const lineHeight = 8;  // Line height (smaller to reduce spacing)
      
      // Set font and size for normal content text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);  // Normal font size for content
  
      // Add logo watermark to the PDF
      // addLogoWatermark(doc);
  
      let yPosition = margins.top;
      const lines = data.split("\n");
  
      lines.forEach((line, index) => {
        // Check if the current line will overflow the page
        if (yPosition + lineHeight > doc.internal.pageSize.height - margins.bottom) {
          doc.addPage();  // Add a new page if the current one is full
          yPosition = margins.top;  // Reset y-position for the new page
          // addLogoWatermark(doc);  // Add logo watermark to the new page
        }
  
        // Add text to PDF with wrapping and alignment
        doc.text(line, margins.left, yPosition, { maxWidth: maxWidth });
        yPosition += lineHeight;  // Increase y-position after each line
      });
  
      // Save the document
      doc.save('chat_history.pdf');
    }
  };
  
  // const addLogoWatermark = (doc) => {
  //   const pageWidth = doc.internal.pageSize.width;
  //   const pageHeight = doc.internal.pageSize.height;
  
  //   const logoUrl = "/logo.png"; // Path to your logo
  
  //   // Set opacity to 0.6
  //   doc.setGState(new doc.GState({ opacity: 0.4 }));
  
  //   const logoWidth = 150;
  //   const logoHeight = 150;
  
  //   // Add image centered with increased size
  //   doc.addImage(
  //     logoUrl,
  //     'PNG',
  //     pageWidth / 2 - logoWidth / 2,
  //     pageHeight / 2 - logoHeight / 2,
  //     logoWidth,
  //     logoHeight,
  //     undefined,
  //     'FAST'
  //   );
  
  //   // Reset opacity
  //   doc.setGState(new doc.GState({ opacity: 1 }));
  // };
  
  return (
    <div className="app-container">
      <h2 className="text-center mb-4 text-primary font-weight-bold custom-title">🤖 InternBot</h2>

      <div className="controls row justify-content-between mb-3">
        <div className="col-md-4">
          <select value={selectedModel} onChange={handleModelChange} className="form-select form-select-lg custom-select">
            <option value="gpt-3.5-turbo">GPT-3.5</option>
            <option value="claude-2">Claude</option>
            <option value="mistralai/mistral-7b-instruct:free">Mistral</option>
          </select>
        </div>

        <div className="col-md-8 text-md-end mt-2 mt-md-0 d-flex">
          <button className="btn btn-outline-primary btn-lg me-2 custom-button" onClick={() => handleExport('txt')}>
            Export TXT
          </button>
          <button className="btn btn-outline-danger btn-lg me-2 custom-button" onClick={() => handleExport('pdf')}>
            Export PDF
          </button>
          <button className="btn btn-outline-secondary btn-lg custom-button" onClick={handleClearChat}>
            Clear Chat
          </button>
        </div>
      </div>

      {/* Chat Window with auto-scroll */}
      <div className="chat-window-container" ref={chatWindowRef}>
        <ChatWindow messages={messages} isTyping={isTyping} />
      </div>

      {/* Input Section */}
      <div className="mt-4">
        <InputBox onSend={handleSend} />
      </div>
    </div>
  );
};

export default App;
