import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostShare from "../../component/addPost/addpost";
import Loading from "../../component/loading/loading";
import Post from "../../component/post/post";
import "./home.css";
function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.user);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (!user) return;

    const role = parseInt(user.role);
    if (role === 0 || role === 1) {
      setIsAdmin(true);
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(`https://northtechcommunity3.onrender.com/post`)
      .then((response) => {
        setPosts(response.data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [user._id]); // Add user._id as a dependency to refetch posts when the user changes

  return (
    <>
      {isAdmin ? null : <PostShare />}

      {posts.map((post) => {
        if (post.user._id === user._id) return <></>;
        return <Post key={post._id} post={post} />;
      })}

      {isLoading && <Loading />}
    </>
  );
}

export default Home;
