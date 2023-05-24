
import ChatBox from "../../component/chatcomponent/chatBox";
import MyChats from "../../component/chatcomponent/myChats";
import Sender from "../../component/chatcomponent/sender";
import "./chat.css";
function Chat() {

  return (
    <section className="chatComponent">
      <div className="app-container">
        <MyChats />
        <div className="app-main">
          <ChatBox />
        </div>
        <div className="app-right">
          <Sender />
        </div>
      </div>
    </section>
  );
}
export default Chat;
