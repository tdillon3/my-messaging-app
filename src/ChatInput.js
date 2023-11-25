// src/ChatInput.js
import React, { useState } from 'react';
import { database } from './firebase';
import { ref, push, serverTimestamp } from 'firebase/database';

const ChatInput = ({ userId }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      push(ref(database, 'messages'), {
        userId,
        text: message,
        timestamp: serverTimestamp(), // Using serverTimestamp from Firebase
      });
      setMessage('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatInput;