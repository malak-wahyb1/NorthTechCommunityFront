import "./friend.css";
import DoneIcon from '@mui/icons-material/Done';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from "react-router-dom";
import axios from "axios";
function FriendComponent(props) {
  const acceptFriend=()=>{
    axios.put(`https://northtechcommunity3.onrender.com/friend/${props.friend._id}`,{accepted:true}).then((friend)=>{
      console.log(friend)
    }).catch((err)=>{console.log(err)})
  }
  const deleteRequest=()=>{
     axios.delete(`https://northtechcommunity3.onrender.com/friend/${props.friend._id}`).then((response)=>{
      console.log(response)
     }).catch((err)=>{console.log(err)})
  }
 
  return (
    <>
      <figure class="snip1218">
        <div class="image">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample70.jpg"
            alt="sample70"
          />

        </div>
        <figcaption>
          <h3>
            {props.friend.sender.first_name}<span> {props.friend.sender.last_name}</span>
          </h3>
          <h5>{props.friend.created_at}</h5>
          <div class="icons">
            <Link onClick={acceptFriend}>
              <i class="ion-social-reddit-outline"><DoneIcon/></i>
            </Link>
            <Link onClick={deleteRequest}>
              {" "}
              <i class="ion-social-twitter-outline"><CloseOutlinedIcon/></i>
            </Link>
          
          </div>
        </figcaption>
      </figure>
    </>
  );
}
export default FriendComponent;
