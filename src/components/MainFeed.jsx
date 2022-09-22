import React, { useState, useContext, useRef, useEffect } from "react";
import { Text, TextInput, ScrollArea, Tabs } from "@mantine/core";
import "./styles/chat.css";
import ChatBubble from "./ChatBubble";
import { AppContext } from "../App";
import { createMessagePack } from "../lib/ChatFeed/chatfeedlib.js";
import axios from "axios";
import { api } from '../config.js';
import { io } from 'socket.io-client';
require('dotenv').config();

// For online chat server
const socket = io('http://192.168.1.8:3002')
// For home chat server
//const socket = io(process.env.REACT_APP_CHAT_SERVER);

const MainFeed = () => {

  let {roomInfo, mainView, setMainView, chatLog, setChatLog, profile } = useContext(AppContext);
  const viewport = useRef(<ScrollArea></ScrollArea>);

  let enterMessage = () => {
    let message = document.getElementById('message').value;
    socket.emit('chat', createMessagePack(message, profile, roomInfo));
  }

  useEffect(() => {
    // Setting up autoscroll to bottom of chat
    viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });

    // Setup of client-side chat socket
    socket.on('chat', (message) => {setChatLog(chatLog = [...chatLog, message])});

    return () => {
      socket.off('chat');
    }
  }, [chatLog]);

  useEffect(() => {
    // Joining the current chat room

    socket.emit('joinRoom', createMessagePack('', profile, roomInfo));

    // Set ting up key handeler for chat --> need to use mantine forms later
    let keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        enterMessage(profile, roomInfo);
        document.getElementById('message').value = "";
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [roomInfo])

  return (
    <div className="main-window">
      <Tabs defaultValue="chat">
        <Tabs.List>
          <Tabs.Tab onClick={()=>{setMainView(mainView = "chat")}} id="chat-button" value="chat">Chat Window</Tabs.Tab>
          <Tabs.Tab onClick={()=>{setMainView(mainView = "video")}} id="video-button" value="video">Videos</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="chat" pt="md">
            <Text className="title">{roomInfo.roomName}</Text>
            <ScrollArea type="scroll" viewportRef={viewport} id="chat-box" style={{ height: 520 }}>
              <ChatBubble />
            </ScrollArea>
            <TextInput
              id="message"
              className="new-message"
              placeholder="Enter Message"
              radius="xl"
            />
        </Tabs.Panel>

        <Tabs.Panel value="video" pt="md">
          <Text>Videos Will go here</Text>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default MainFeed;