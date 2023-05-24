import { ChatBubbleOutline } from "@mui/icons-material";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { storeChat, storeSelectedChat } from "../../redux/reducer";
import Friend from "../friend";
import Group from "../group";
import GroupInfo from "../groupInfo";
import { getImage, getSender } from "../logic";

function MyChats() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const newchat = useSelector((state) => state.newChat);
  const [chat, setChat] = useState([]);

  const [selectedChat, setSelectedChat] = useState(null);
  dispatch(storeChat(user));

  useEffect(() => {
    const user1 = user._id;
    console.log(user1);
    axios
      .get(`http://localhost:5000/chat?user1=${user1}`)
      .then((response) => {
        console.log(response);
        setChat(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user._id]);
  const handleselectChat = (chat) => {
    setSelectedChat(chat);
    dispatch(storeSelectedChat(chat));
  };

  return (
    <>
      <div className="app-left">
        <div className="app-left-header">
          <div className="app-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <ChatBubbleOutline />
            </svg>
          </div>
          <h1>North Tech Community</h1>
        </div>
        <div className="app-profile-box">
          {selectedChat ? (
            <>
              <h1>
                {" "}
                {!selectedChat.isGroupChat
                  ? getSender(user, selectedChat.user)
                  : selectedChat.chatName}
              </h1>
              <img
                src={
                  !selectedChat.isGroupChat
                    ? getImage(user, selectedChat.user)
                    : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                }
                alt="chat"
              />
              {selectedChat.isGroupChat?<GroupInfo users={selectedChat.user} name={selectedChat.chatName}/>:null}
            </>
          ) : null}
        </div>
        <div className="chat-list-wrapper">
          <section className="newgroup">
            <Friend />
            <Group />
          </section>

          <div className="chat-list-header">
            Chats <span className="c-number"></span>
            <svg
              className="list-header-arrow"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              class="feather feather-chevron-up"
              viewBox="0 0 24 24"
            >
              <defs />
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </div>
          <ul className="chat-list active">
            {chat.map((chat) => (
              <li
                className={`chat-list-item ${
                  selectedChat === chat ? "active" : ""
                }`}
                onClick={() => handleselectChat(chat)}
              >
                <img
                  src={
                    !chat.isGroupChat
                      ? getImage(user, chat.user)
                      : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  }
                  alt="chat"
                />
                <span className="chat-list-name">
                  {!chat.isGroupChat
                    ? getSender(user, chat.user)
                    : chat.chatName}
                </span>
              </li>
            ))}
            {newchat ? (
              <li
                className={`chat-list-item ${
                  selectedChat === newchat ? "active" : ""
                }`}
                onClick={() => setSelectedChat(newchat)}
              >
                <img src={`http://localhost:5000/${newchat.media}`} alt="" />
                <span className="chat-list-name">{newchat.first_name}</span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MyChats;