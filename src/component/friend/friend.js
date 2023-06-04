import "./friend.css";
import axios from "axios";
function FriendComponent(props) {
  const acceptFriend = () => {
    axios
      .put(
        `https://northtechcommunity3.onrender.com/friend/${props.friend._id}`,
        { accepted: true }
      )
      .then((friend) => {
        console.log(friend);
      })
      .catch((err) => {});
  };
  const deleteRequest = () => {
    axios
      .delete(
        `https://northtechcommunity3.onrender.com/friend/${props.friend._id}`
      )
      .then((response) => {})
      .catch((err) => {});
  };

  return (
    <>
      <div className="background"></div>
      <div className="profile-card">
        <div className="cover"></div>
        <div className="profile">
          <div className="pic">
            <img
              src={props.friend.friend.media}
              alt=""
            />
          </div>
          <div className="above-fold">
            <div className="name">
              {props.friend.friend.first_name} {props.friend.friend.last_name}
            </div>

            <div className="row">
              <div className="buttonAcc" onClick={acceptFriend}>
                Accept
              </div>
              <div className="buttonAcc" onClick={deleteRequest}>
                Delete
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default FriendComponent;
