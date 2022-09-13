import React, { useState, useContext } from "react";
import { Text, TextInput, Paper } from '@mantine/core';
import '../styles/chat.css';
import { AppContext } from "../../App";

const ChatBubble = () => {

  let{chatLog, profile} = useContext(AppContext);

  return (
    <div className="chat-feed">
      {
        chatLog.map((chatMessage) => {
          if (chatMessage.user_name === profile.username) {
            return (
              <div className="chat-bubble-self">
                <div className="username">{chatMessage.user_name}</div>
                <div className="timestamp">{chatMessage.time_stamp}</div>
                <div className="message">{chatMessage.user_message}</div>
              </div>
            )
          } else {
            return (
              <div className="chat-bubble-others">
                <div className="username">{chatMessage.user_name}</div>
                <div className="timestamp">{chatMessage.time_stamp}</div>
                <div className="message">{chatMessage.user_message}</div>
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default ChatBubble;