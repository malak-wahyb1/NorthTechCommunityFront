import { useEffect } from "react"

import { useSelector } from "react-redux";

import './myFriend.css'
import axios from "axios";
function Friend(){
  const user = useSelector((state) => state.user);

  useEffect(()=>{
axios.get(`https://northtechcommunity3.onrender.com/user/${user._id}`).then((response)=>{
  console.log(response)
}).catch((err)=>{
  console.error(err);
})
  },[user._id])
return (
  <div className="friend">
  {/* {friends.map((friend) => (
    <FriendComponent key={friend.id} friend={friend} />
  ))} */}
</div>
)
}
export default Friend