
import ChatBox from "../../component/chatcomponent/chatBox";
import MyChats from "../../component/chatcomponent/myChats";
import Sender from "../../component/chatcomponent/sender";
import SideBar from "../../component/sidebar/sidebar";
import "./chat.css";
function Chat() {

  return (
    <section className="chatComponent">
        <SideBar/>
      <div className="app-container">
     
        <div className="app-main">
          <ChatBox />
        </div>
        <MyChats />
      </div>
    </section>
  );
}
export default Chat;
