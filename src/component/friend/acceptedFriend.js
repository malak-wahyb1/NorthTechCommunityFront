import "./friend.css";
import { useSelector } from "react-redux";
function AcceptedFriend(props) {
    const user = useSelector((state) => state.user);
  if(props.friend.user._id===user._id){
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
          </div>
        </div>
      </div>
    </>
  );}else{
    return (
        <>
          <div className="background"></div>
          <div className="profile-card">
            <div className="cover"></div>
            <div className="profile">
              <div className="pic">
                <img
                  src={`https://northtechcommunity3.onrender.com/${props.friend.user.media}`}
                  alt=""
                />
              </div>
              <div className="above-fold">
                <div className="name">
                  {props.friend.user.first_name} {props.friend.user.last_name}
                </div>
              </div>
            </div>
          </div>
        </>
      )
  }
}
export default AcceptedFriend;
