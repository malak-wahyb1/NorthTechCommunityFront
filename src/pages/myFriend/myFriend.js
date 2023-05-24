import { useEffect, useState } from "react"
import FriendComponent from "../../component/friend/friend";
import { useSelector } from "react-redux";

import './myFriend.css'
import axios from "axios";
function Friend(){
  const user = useSelector((state) => state.user);
const [friends,setFriends]=useState([])
  useEffect(()=>{
axios.get(`http://localhost:5000/friend/request/${user._id}`).then((response)=>{
  setFriends(response.data.message.docs)
  console.log(response.data.message.docs)
}).catch((err)=>{
  console.error(err);
})
  },[user._id])
return (
  <div className="friend">
  {friends.map((friend) => (
    <FriendComponent key={friend.id} friend={friend} />
  ))}
</div>
)
}
export default Friend