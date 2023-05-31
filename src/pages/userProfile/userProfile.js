import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../component/loading/loading";
import Post from "../../component/post/post";
import { useSelector } from "react-redux";

import "./userProfile.css";
function UserProfile() {
  const users = useSelector((state) => state.user);

  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  const [friend, setFriend] = useState([]);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    axios
      .get(`https://northtechcommunitymalakwahyb.onrender.com/friend/All/${userId}`)
      .then((response) => {
        console.log(response);
        setFriend(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    // const isUserFriend = friend.some(
    //   (friendObj) => friendObj._id === users._id
    // );
    // setIsFriend(isUserFriend);
  }, [friend, user, users]);

  useEffect(() => {
    fetchPosts();

    // Clean up scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!hasMore) return; // Stop fetching if there are no more pages

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  const fetchPosts = () => {
    if (isLoading) return; // Prevent fetching if already loading

    setIsLoading(true);

    axios
      .get(`https://northtechcommunitymalakwahyb.onrender.com/post/user/${userId}?page=${page}&pageSize=20`) // Adjust pageSize as per your requirement
      .then((response) => {
        const { docs, hasNextPage } = response.data.message;
        setPosts((prevPosts) => [...prevPosts, ...docs]);
        setHasMore(hasNextPage);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    axios
      .get(`https://northtechcommunitymalakwahyb.onrender.com/user/${userId}`)
      .then((response) => {
        setUser(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);
  const handleFriendRequest = () => {
    console.log(userId)
    console.log(users._id)

      axios
        .put(`https://northtechcommunitymalakwahyb.onrender.com/user/follow/${userId}/${users._id}`, {
          followId: userId,
          senderId: users._id,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    
    
  };
  return (
    <>
      <div class="back-to-top"></div>
      <main>
        <div class="user-header-wrapper flexbox">
          <div class="user-header-inner flexbox">
            <div class="user-header-overlay"></div>
            <img
              class="user-header"
              src={`https://northtechcommunitymalakwahyb.onrender.com/${user.media}`}
              alt=""
            />
          </div>
        </div>
        <div class="user-info-bar">
          <div class="ufo-bar-col3">
            <div class="ufo-bar-col3-inner">
              <div class="username-wrapper-outer">
                <div class="username-wrapper">
                  <h3 class="username-dev">
                    {user.first_name} {user.last_name}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div class="ufo-bar-col4">
            <div class="ufo-bar-col4-inner">
              
                <p>
                  <div class="ufo-bar-col4-inner">
                    <button
                      class="button2 btn-primary2"
                      onClick={handleFriendRequest}
                    >
                      <i class="uil uil-plus"></i>Follow
                      <div class="btn-secondary2"></div>
                    </button>
                  </div>
                </p>
           
            </div>
          </div>
        </div>

        {posts.map((post) => {
          return <Post post={post} />;
        })}
        {isLoading && <Loading />}
      </main>
    </>
  );
}
export default UserProfile;
