import React, { useState, useContext, useRef, useEffect } from "react";
import { Text, TextInput, ScrollArea, Tabs } from "@mantine/core";
import "./styles/chat.css";
import ChatBubble from "./ChatBubble";
import { AppContext } from "../App";
import { getTime, getTodayDate } from "../lib/ChatFeed/chatfeedlib.js";
import axios from "axios";
import { api } from '../config.js';

const MainFeed = () => {

  let {mainView, setMainView, chatLog, setChatLog, profile } = useContext(AppContext);
  const viewport = useRef(<ScrollArea></ScrollArea>);

  useEffect(() => {
    viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
  }, [chatLog]);

  useEffect(() => {
    let keyDownHandler = (event) => {
      // Enable below if you want to see keylog in console

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
  }, []);

  let enterMessage = () => {
    let time = getTime();
    let message = document.getElementById('message').value;
    let newMessage = {
      user_name: profile.username,
      user_message: message,
      time_stamp: time,
      date: getTodayDate()
    };

    setChatLog(chatLog = [...chatLog, newMessage]);
  }

  return (
    <div className="main-window">
      <Tabs defaultValue="chat">
        <Tabs.List>
          <Tabs.Tab onClick={()=>{setMainView(mainView = "chat")}} id="chat-button" value="chat">Chat Window</Tabs.Tab>
          <Tabs.Tab onClick={()=>{setMainView(mainView = "video")}} id="video-button" value="video">Videos</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="chat" pt="md">
            <Text className="title">Chat Room Name Here</Text>
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