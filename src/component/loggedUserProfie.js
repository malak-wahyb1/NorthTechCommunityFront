import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import Post from "./post/post";
import Loading from "./loading/loading";

import FormComponent from "./form";
function LoggedUser() {
  const users = useSelector((state) => state.user);

  const { userId } = useParams();

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleFormResponse = (message) => {
    setUser(message);
  };
  useEffect(() => {
    axios
      .get(`https://northtechcommunity3.onrender.com/friend/${userId}`)
      .then((response) => {
       
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

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
      .get(`https://northtechcommunity3.onrender.com/post/user/${userId}?page=${page}&pageSize=20`) // Adjust pageSize as per your requirement
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
      .get(`http://localhost:5000/user/${userId}`)
      .then((response) => {
        setUser(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return (
    <>
      <div class="back-to-top"></div>
      <main>
        <div class="user-header-wrapper flexbox">
          <div class="user-header-inner flexbox">
            <div class="user-header-overlay"></div>

            <img
              class="user-header"
              src={`https://northtechcommunity3.onrender.com/${user.media}`}
              alt=""
            />
          </div>
        </div>
        <div class="user-info-bar-logged">
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
                  <FormComponent
                    inputFields={[
                      { name: "first_name", label: "First Name", type: "text" },
                      { name: "last_name", label: "Last Name", type: "test" },
                      { name: "media", label: "Image", type: "file" },
                    ]}
                    handleFormResponse={handleFormResponse}
                    title="Profile"
                    url={`user/${users._id}`}
                  />
                </div>
              </p>
            </div>
          </div>
        </div>

        {posts.map((post) => {
          return <Post post={post} logged="true"/>;
        })}
        {isLoading && <Loading />}
      </main>
    </>
  );
}
export default LoggedUser;
