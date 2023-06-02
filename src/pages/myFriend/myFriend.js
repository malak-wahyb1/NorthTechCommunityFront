
import { useSelector } from "react-redux";

import './myFriend.css'

import BasicTabs from "../../component/tabs";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import FriendComponent from "../../component/friend/friend";
function Friend(){
  const user = useSelector((state) => state.user);
const [friend,setFriend]=useState([])
  useEffect(()=>{
axios.get(`https://northtechcommunity3.onrender.com/friend/request/${user._id}`).then((response)=>{
console.log(response);
setFriend(response.data.message)
}).catch((err)=>{
console.log(err);
})
  },[user._id])
return (
  <div className="friend">
  {friend.map((friend) => (
    <FriendComponent key={friend.id} friend={friend} />
  ))}
  
</div>
)
}
export default Friend