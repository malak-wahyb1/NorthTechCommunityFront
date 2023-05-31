import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoggedUser from "./component/loggedUserProfie";
import NotFound from "./component/notFound";
import { AdminAcc } from "./pages/Admin/adminacc";
import { Login } from "./pages/Admin/login";
import { Users } from "./pages/Admin/users";
import Chat from "./pages/chat/chat";
import Event from "./pages/event/event";
import Home from "./pages/home/home";
import LoginPage from "./pages/login/login";
import Friend from "./pages/myFriend/myFriend";
import SinglePost from "./pages/singlePost/singlePost";
import UserProfile from "./pages/userProfile/userProfile";
import Workspace from "./pages/workspace/workspace";
import AdminRoute from "./route/admin";
import VisitorRoute from "./route/visitor";

function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        <Route path="/user" element={<VisitorRoute />}>
          <Route path="/user/home" element={<Home />} />
          <Route path="/user/friend" element={<Friend />} />
          <Route path="/user/event" element={<Event />} />
          <Route path="/user/workspace" element={<Workspace />} />

          <Route path="/user/post/:postId" element={<SinglePost />} />
          <Route path="/user/profile/:userId" element={<UserProfile />} />
          <Route path="/user/:userId" element={<LoggedUser />} />

          <Route path="/user/admin/adminacc" element={<AdminAcc />} />
          <Route path="/user/admin/users" element={<Users />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="/admin" element={<Login />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user/chat" element={<Chat />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
