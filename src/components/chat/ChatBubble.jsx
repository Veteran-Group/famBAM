import React, { useState, useContext } from "react";
import { Text, TextInput, Paper } from '@mantine/core';
import '../styles/chat.css';
import { AppContext } from "../../App";

const ChatBubble = () => {

  let{chatLog, setChatLog} = useContext(AppContext);

  return (
    <div className="chat-feed">
      {
        chatLog.map((chatMessage) => {
          return (
            <Paper className="chat-bubble" shadow="sm" radius="xl" p="sm">
              <div className="username">{chatMessage.username}</div>
              <div className="timestamp">{chatMessage.timestamp}</div>
              <div className="message">{chatMessage.message}</div>
            </Paper>
          )
        })
      }
    </div>
  )
}

export default ChatBubble;