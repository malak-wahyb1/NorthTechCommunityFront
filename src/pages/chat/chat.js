import { ChatBubbleOutline } from "@mui/icons-material";
import { useState } from "react";
import "./chat.css";
function Chat() {
  return (
    <section className="chatComponent">
      <div className="app-container">
        <div className="app-left">
          <div className="app-left-header">
            <div className="app-logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <ChatBubbleOutline />
              </svg>
            </div>
            <h1>North Tech Community</h1>
          </div>
          <div class="app-profile-box">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
              alt="profile"
            />
            <div class="app-profile-box-name">
              Pam Beesly Halpert
              <button class="app-setting">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="feather feather-settings"
                  viewBox="0 0 24 24"
                >
                  <defs />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </button>
            </div>
            <p class="app-profile-box-title">UI Designer</p>
            <div class="switch-status">
              <input
                type="checkbox"
                name="switchStatus"
                id="switchStatus"
                checked
              />
              <label class="label-toggle" for="switchStatus"></label>
              <span class="toggle-text toggle-online">Online</span>
              <span class="toggle-text toggle-offline">Offline</span>
            </div>
          </div>
          <div class="chat-list-wrapper">
            <div class="chat-list-header">
              Active Conversations <span class="c-number">4</span>
              <svg
                class="list-header-arrow"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                className="feather feather-chevron-up"
                viewBox="0 0 24 24"
              >
                <defs />
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </div>
            <ul className="chat-list active">
              <li className="chat-list-item active">
                <img
                  src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                  alt="chat"
                />
                <span className="chat-list-name">Dwight Schrute</span>
              </li>
              <li className="chat-list-item">
                <img
                  src="https://images.unsplash.com/photo-1566465559199-50c6d9c81631?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                  alt="chat"
                />
                <span className="chat-list-name">Andy Bernard</span>
              </li>
              <li className="chat-list-item">
                <img
                  src="https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2552&q=80"
                  alt="chat"
                />
                <span className="chat-list-name">Michael Scott</span>
              </li>
              <li className="chat-list-item">
                <img
                  src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80"
                  alt="chat"
                />
                <span className="chat-list-name">Holy Flax</span>
              </li>
              <li className="chat-list-item">
                <img
                  src="https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                  alt="chat"
                />
                <span className="chat-list-name">Jim Halpert</span>
              </li>
            </ul>
          </div>
          <div className="chat-list-wrapper">
            <div className="chat-list-header active">
              Achived Conversations <span class="c-number">3</span>
              <svg
                class="list-header-arrow"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                className="feather feather-chevron-up"
                viewBox="0 0 24 24"
              >
                <defs />
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </div>
            <ul className="chat-list">
              <li className="chat-list-item">
                <img
                  src="https://images.unsplash.com/photo-1542042457485-a4c7afd74cd5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1270&q=80"
                  alt="chat"
                />
                <span className="chat-list-name">Toby Flenderson</span>
              </li>
              <li className="chat-list-item">
                <img
                  src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjV8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                  alt="chat"
                />
                <span className="chat-list-name">Kelly Kapoor</span>
              </li>
              <li className="chat-list-item">
                <img
                  src="https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
                  alt="chat"
                />
                <span className="chat-list-name">Roy Andersson</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="app-main">
          <div className="chat-wrapper">
            <div className="message-wrapper reverse">
              <img
                className="message-pp"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                alt="profile-pic"
              />
              <div className="message-box-wrapper">
                <div className="message-box">
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                  amet, consectetur
                </div>
                <span>9h ago</span>
              </div>
            </div>
            <div className="message-wrapper reverse">
              <img
                className="message-pp"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                alt="profile-pic"
              />
              <div className="message-box-wrapper">
                <div className="message-box">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </div>
                <span>9h ago</span>
              </div>
            </div>
            <div className="message-wrapper">
              <img
                className="message-pp"
                src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80"
                alt="profile-pic"
              />
              <div className="message-box-wrapper">
                <div className="message-box">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                  qui dolorem ipsum quia dolor sit amet, consectetur
                </div>
                <span>9h ago</span>
              </div>
            </div>
            <div className="message-wrapper">
              <img
                className="message-pp"
                src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80"
                alt="profile-pic"
              />
              <div className="message-box-wrapper">
                <div className="message-box">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </div>
                <span>9h ago</span>
              </div>
            </div>
            <div className="message-wrapper reverse">
              <img
                className="message-pp"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                alt="profile-pic"
              />
              <div className="message-box-wrapper">
                <div className="message-box">Lorem ipsum dolor sit amet</div>
                <span>9h ago</span>
              </div>
            </div>
            <div className="message-wrapper reverse">
              <img
                className="message-pp"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                alt="profile-pic"
              />
              <div className="message-box-wrapper">
                <div className="message-box">Lorem ipsum dolor</div>
                <span>9h ago</span>
              </div>
            </div>
            <div className="message-wrapper">
              <img
                className="message-pp"
                src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80"
                alt="profile-pic"
              />
              <div className="message-box-wrapper">
                <div className="message-box">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </div>
                <span>9h ago</span>
              </div>
            </div>
            <div className="message-wrapper">
              <img
                className="message-pp"
                src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80"
                alt="profile-pic"
              />
              <div className="message-box-wrapper">
                <div className="message-box">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </div>
                <span>9h ago</span>
              </div>
            </div>
            <div className="message-wrapper">
              <img
                className="message-pp"
                src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80"
                alt="profile-pic"
              />
              <div className="message-box-wrapper">
                <div className="message-box">Lorem ipsum dolor sit amet</div>
                <span>9h ago</span>
              </div>
            </div>
            <div className="message-wrapper reverse">
              <img
                className="message-pp"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                alt="profile-pic"
              />
              <div className="message-box-wrapper">
                <div className="message-box">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </div>
                <span>9h ago</span>
              </div>
            </div>
          </div>
          <div className="chat-input-wrapper">
            <button className="chat-attachment-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="feather feather-paperclip"
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
              />
              <button className="emoji-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="feather feather-smile"
                  viewBox="0 0 24 24"
                >
                  <defs />
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
                </svg>
              </button>
            </div>
            <button className="chat-send-btn">Send</button>
          </div>
        </div>
        <div className="app-right">
          <div className="app-profile-box">
            <img
              src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
              alt="profile"
            />
            <p className="app-profile-box-title name">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-user"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Dwight Scrute
            </p>
            <p className="app-profile-box-title mail">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-mail"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              dwightscrute@test.com
            </p>
            <button className="archive-btn">
              Archive
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="feather feather-archive"
                viewBox="0 0 24 24"
              >
                <defs />
                <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Chat;
