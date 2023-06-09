import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import React from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

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
  }, [user]);
  useEffect(() => {
    fetchChat();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message recieved", (newMessageRecived) => {
      setChats([...chats, newMessageRecived]);
    });
  });

  const fetchChat = () => {
    if (!selectedChat) {
      return;
    }

    axios
      .get(
        `https://northtechcommunity3.onrender.com/message/${selectedChat._id}`
      )
      .then((response) => {
       
        setChats(response.data.message);
        socket.emit("join chat", selectedChat);
      })
      .catch((error) => {
      
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
        
        socket.emit(
          "new message",
          response.data.message[0],
          response.data.message[0].chat.user
        );
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
       
        {/* {!selectedChat && (
          <div className='unhotorized chatNo'>
          <div className="unhotorizedcontainer">        
            <div className="text">{'>_ '}<Link to='/'>No Chat Selected.</Link><span className="line">{'∣'}</span></div>
          </div></div>
        )} */}
        {selectedChat && (
          <ScrollableFeed>
            {chats &&
              chats.map((m, i) => (
                <React.Fragment key={i}>
                 {(m.sender._id ===user._id)?( <div className="message-wrapper reverse">
                      <img
                        className="message-pp"
                        src={m.sender.media}
                        alt="profile-pic"
                      />
                      <div className="message-box-wrapper">
                        <div className="message-box">{m.content}</div>
                        <span>{m.created_at}</span>
                      </div>
                    </div>):(<div className="message-wrapper">
                      <img
                        className="message-pp"
                        src={m.sender.media}
                        alt="profile-pic"
                      />
                      <div className="message-box-wrapper">
                        <div className="message-box">{m.content}</div>
                        <span>{m.created_at}</span>
                      </div>
                    </div>)}
                </React.Fragment>
              ))}
          </ScrollableFeed>
        )}
      </div>
      <div className="chat-input-wrapper">
      
        <div className="input-wrapper">
          <input
            type="text"
            className="chat-input"
            placeholder="Enter your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          
        </div>
        <button className="chat-send-btn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </>
  );
}

export default ChatBox;
