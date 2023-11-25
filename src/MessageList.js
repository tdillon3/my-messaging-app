// src/MessageList.js
// src/MessageList.js
import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, onValue, off } from 'firebase/database';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = ref(database, 'messages');
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const formattedMessages = Object.keys(messagesData).map((key) => {
          return { ...messagesData[key], id: key };
        });
        setMessages(formattedMessages);
      }
    });

    // Cleanup function
    return () => off(messagesRef, 'value', unsubscribe);
  }, []);

  return (
    <div>
      {messages.map((message) => (
        <p key={message.id}>
          {message.userId}: {message.text}
        </p>
      ))}
    </div>
  );
};

export default MessageList;