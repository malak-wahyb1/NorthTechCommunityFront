import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../component/loading/loading";
import Post from "../../component/post/post";
import { useSelector } from "react-redux";
import "./userProfile.css";
import { toast } from "react-hot-toast";
import {
  Email,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
function UserProfile() {
  const users = useSelector((state) => state.user);
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [socialMedian, setSocialMedian] = useState([]);

  const [isFriend, setIsFriend] = useState(false);
 



  useEffect(() => {

    axios
      .get(`https://northtechcommunity3.onrender.com/post/user/${userId}`) // Adjust pageSize as per your requirement
      .then((response) => {
        setPosts(response.data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  },[isLoading,userId])
  useEffect(() => {
    axios
      .get(`https://northtechcommunity3.onrender.com/user/${userId}`)
      .then((response) => {
        setUser(response.data.message);
      })
      .catch((error) => {});
  }, [userId]);
  const handleFriendRequest = () => {
    axios
      .post(
        `https://northtechcommunity3.onrender.com/friend`,
        {
          friend: users._id,
          user: userId,
        }
      )
      .then((response) => {
        setIsFriend(response)
        toast.success("Request sent successfully", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((error) => {
        toast.error("Try Again", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  useEffect(() => {
    axios
      .get(`https://northtechcommunity3.onrender.com/friend/All/${userId}`)
      .then((response) => {
        setIsFriend(response.data.message.some((friend) => friend.user._id === users._id));
        setIsFriend(response.data.message.some((friend) => friend.friend._id === users._id));
      })
      .catch((error) => {});
  }, [userId, users._id]);

  useEffect(() => {
    axios
      .get(
        `https://northtechcommunitymalakwahyb.onrender.com/profile/${userId}`
      )
      .then((response) => {
       
        setSocialMedian(response.data.message);
        console.log(response.data)
      })
      .catch((error) => {});
  }, [userId]);

  return (
    <>
      <div className="back-to-top"></div>
      <main>
        <div className="user-header-wrapper flexbox">
          <div className="user-header-inner flexbox">
            <div className="user-header-overlay"></div>
            <img
              className="user-header"
              src={user.media}
              alt=""
            />
          </div>
        </div>
        <div className="user-info-bar">
          <div className="ufo-bar-col3">
            <div className="ufo-bar-col3-inner">
              <div className="username-wrapper-outer">
                <div className="username-wrapper">
                  <h3 className="username-dev">
                    {user.first_name} {user.last_name}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="ufo-bar-col4">
            <div className="ufo-bar-col4-inner">
              {socialMedian?(
                <div className="ufo-bar-col4-inner">
                
                   {socialMedian.Linkedin?(<section className="social_media"> <LinkedIn
                      sx={{
                        "&:hover": { color: "#15bab3", cursor: "pointer" },
                      }}
                    /></section>):null}
                  
                
                  {socialMedian.Email?  <section className="social_media"><Email
                      sx={{
                        "&:hover": { color: "#15bab3", cursor: "pointer" },
                      }}
                    /> </section>:null}  
                 
                 
                  {socialMedian.Github?<section className="social_media"><GitHub
                      sx={{
                        "&:hover": { color: "#15bab3", cursor: "pointer" },
                      }}
                    /></section>:null}
                  
                
                  {socialMedian.Facebook?<section className="social_media"><Facebook
                      sx={{
                        "&:hover": { color: "#15bab3", cursor: "pointer" },
                      }}
                    /></section>:null}
                  
                 
                  {socialMedian.Instagram? <section className="social_media"> <Instagram
                      sx={{
                        "&:hover": { color: "#15bab3", cursor: "pointer" },
                      }}
                    /> </section>:null}
                 
                  
                  {socialMedian.Twitter?<section className="social_media"><Twitter
                      sx={{
                        "&:hover": { color: "#15bab3", cursor: "pointer" },
                      }}
                    /> </section>:null}
                </div>
             
              ):null}
            </div>
          </div>
          <div className="ufo-bar-col4">
            <div className="ufo-bar-col4-inner">
            {!isFriend && (
               
                  <div className="ufo-bar-col4-inner">
                    <button
                      className="button2 btn-primary2"
                      onClick={handleFriendRequest}
                    >
                      <i className="uil uil-plus"></i>Add Friend
                      <div className="btn-secondary2"></div>
                    </button>
                  </div>
               
              )}
                 
            </div>
          </div>
        </div>

        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
        {isLoading && <Loading />}
      </main>
    </>
  );
}
export default UserProfile;
