import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./pages/chat/chat";
import Event from "./pages/event/event";
import Home from "./pages/home/home";
import LoginPage from "./pages/login/login";
import Friend from "./pages/myFriend/myFriend";
import AdminRoute from "./route/admin";
import VisitorRoute from "./route/visitor";

function App() {
  return (
    <>
  <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
      <Routes>

        <Route path="/user" element={<VisitorRoute />}>
          <Route path="/user/home" element={<Home />}/>
          <Route path="/user/friend" element={<Friend/>}/>
          <Route path="/user/event" element={<Event/>}/>


        </Route>
        <Route path="/admin" element={<AdminRoute />}></Route>
        <Route path="/" element={<LoginPage />} />
          <Route path="/user/chat" element={<Chat/>}/>
      </Routes>
    </>
  );
}

export default App;
