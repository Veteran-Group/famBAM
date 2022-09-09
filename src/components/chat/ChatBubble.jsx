import React, { useState, useContext } from "react";
import { Text, TextInput, Paper } from '@mantine/core';
import '../styles/chat.css';
import { AppContext } from "../../App";

const ChatBubble = () => {

  let{chatLog, setChatLog, profile} = useContext(AppContext);

  return (
    <div className="chat-feed">
      {
        chatLog.map((chatMessage) => {
          if (chatMessage.username === profile.username) {
            return (
              <div className="chat-bubble-self">
                <div className="username">{chatMessage.username}</div>
                <div className="timestamp">{chatMessage.timestamp}</div>
                <div className="message">{chatMessage.message}</div>
              </div>
            )
          } else {
            return (
              <div className="chat-bubble-others">
                <div className="username">{chatMessage.username}</div>
                <div className="timestamp">{chatMessage.timestamp}</div>
                <div className="message">{chatMessage.message}</div>
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default ChatBubble;