import React, { useState, useContext, useRef, useEffect } from "react";
import { Text, TextInput, ScrollArea } from "@mantine/core";
import "../styles/chat.css";
import ChatBubble from "./ChatBubble";
import { AppContext } from "../../App";
import { getTime } from "../../lib/ChatFeed/chatfeedlib.js";
import axios from "axios";
import { api } from '../../config.js';

const ChatFeed = () => {

  let {chatLog, setChatLog, profile, setProfile, chatRoomCredentials, setChatRoomCredentials} = useContext(AppContext);
  const viewport = useRef(<ScrollArea></ScrollArea>);

  useEffect(() => {
    viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
  }, [chatLog]);

  useEffect(() => {
    axios.get(`${api}/loadGuestRoom?roomName=${chatRoomCredentials.roomName}&roomPass=${chatRoomCredentials.roomPass}`)
      .then((response) => {
        console.log(response.data);
        setChatLog(chatLog = response.data)
      })
  }, [])

  useEffect(() => {
    let keyDownHandler = (event) => {
      // Enable below if you want to see keylog in console

      if (event.key === "Enter") {
        console.log(`Chat Log before message: ${chatLog}`);
        event.preventDefault();
        enterMessage();
        document.getElementById('message').value = "";
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  let enterMessage = () => {
    let time = getTime();
    let message = document.getElementById('message').value;

    setChatLog(chatLog = [...chatLog, {
      user_name: profile.username,
      user_message: message,
      time_stamp: time
    }]);

    console.log(`===========`);
    console.log(`Chat log after: ${chatLog}`)
  }

  return (
    <div className="chat-window">
      <Text className="title">Chat Room Name Here</Text>
      <ScrollArea type="scroll" viewportRef={viewport} id="chat-box" className="chat-box" style={{ height: 250 }}>
        <ChatBubble />
      </ScrollArea>
      <TextInput
        id="message"
        className="newMessage"
        placeholder="Enter Message"
        radius="xl"
        withAsterisk
      />
    </div>
  )
}

export default ChatFeed;