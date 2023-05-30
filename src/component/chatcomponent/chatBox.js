import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../logic";
import React from "react";
import io from "socket.io-client";
const ENDPOINT = "https://northtechcommunity3.onrender.com";
var socket, selectedChatCompare;
function ChatBox() {
  const selectedChat = useSelector((state) => state.selectedChat);
  const user = useSelector((state) => state.user);

  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);
  useEffect(() => {
    fetchChat();
    selectedChatCompare=selectedChat
  }, [selectedChat]);
  useEffect(()=>{
    socket.on("message recieved",(newMessageRecived)=>{
    
        setChats([...chats,newMessageRecived])
      
    })
  })

  const fetchChat = () => {
    if (!selectedChat) {
      return;
    }

    axios
      .get(`https://northtechcommunity3.onrender.com/message/${selectedChat._id}`)
      .then((response) => {
        setChats(response.data.message);
        socket.emit('join chat',selectedChat)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSendMessage = () => {
    axios
      .post(`https://northtechcommunity3.onrender.com/message`, {
        sender: user._id,
        content: message,
        chatId: selectedChat._id,
      })
      .then((response) => {
        socket.emit("new message",response.data.message[0],response.data.message[0].chat.user)
        setChats([...chats, response.data.message[0]]);
        setMessage("");
      })
      .catch((error) => {
        return;
      });
  };

  return (
    <>
      <div className="chat-wrapper">
        {!selectedChat && (
          <h1 className="start-chat-message">
            Click On The User To Start Chatting
          </h1>
        )}
        {selectedChat && (
          <ScrollableFeed>
            {chats &&
              chats.map((m, i) => (
                <React.Fragment key={i}>
                 
                  {(isSameSender(chats, m, i, user._id) ||
                    isLastMessage(chats, i, user._id)) && (
                    <div className="message-wrapper">
                      <img
                        className="message-pp"
                        src={`https://northtechcommunity3.onrender.com/${m.sender.media}`}
                        alt="profile-pic"
                      />
                      <div className="message-box-wrapper">
                        <div className="message-box">{m.content}</div>
                        <span>9h ago</span>
                      </div>
                    </div>
                  )}
                  <div className="message-wrapper reverse">
                    <img
                      className="message-pp"
                      src={`https://northtechcommunity3.onrender.com/${m.sender.media}`}
                      alt="profile-pic"
                    />
                    <div className="message-box-wrapper">
                      <div className="message-box">{m.content}</div>
                      <span>9h ago</span>
                    </div>
                  </div>
                </React.Fragment>
              ))}
          </ScrollableFeed>
        )}
      </div>
      <div className="chat-input-wrapper">
        <button className="chat-attachment-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="feather feather-paperclip"
            viewBox="0 0 24 24"
          >
            <defs />
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
        </button>
        <div className="input-wrapper">
          <input
            type="text"
            className="chat-input"
            placeholder="Enter your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="emoji-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="feather feather-smile"
              viewBox="0 0 24 24"
            >
              <defs />
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
            </svg>
          </button>
        </div>
        <button className="chat-send-btn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </>
  );
}

export default ChatBox;
