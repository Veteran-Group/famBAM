import React, { useState, useContext, useRef, useEffect } from "react";
import { Text, TextInput, ScrollArea, Tabs } from "@mantine/core";
import "./styles/chat.css";
import ChatBubble from "./ChatBubble";
import { AppContext } from "../App";
import { createMessagePack } from "../lib/ChatFeed/chatfeedlib.js";
import axios from "axios";
import { api } from '../config.js';
require('dotenv').config();


const MainFeed = () => {

  let {socketState, roomInfo, mainView, setMainView, chatLog, setChatLog, profile } = useContext(AppContext);
  const viewport = useRef(<ScrollArea></ScrollArea>);

  useEffect(() => {
    // Setting up autoscroll to bottom of chat
    viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });

    // Setup of client-side chat socket
    socketState.on('chat', (message) => {setChatLog(chatLog = [...chatLog, message])});

    return () => {
      socketState.off('chat', (message) => {setChatLog(chatLog = [...chatLog, message])});
    }
  }, [chatLog]);

  useEffect(() => {

    axios.get(`${api}/getChat?cid=${roomInfo.id}`)
      .then((response) => {
        setChatLog(chatLog = response.data);
      })
      .catch((err) => {
        console.log(`Error: ./App -> useEffect - updating chat`)
      })

    let enterMessage = () => {
      let message = document.getElementById('message').value;
      socketState.emit('chat', createMessagePack(message, profile, roomInfo));
    }

    // Set ting up key handeler for chat --> need to use mantine forms later
    let keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        enterMessage();
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