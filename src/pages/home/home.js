import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostShare from "../../component/addPost/addpost";
import Loading from "../../component/loading/loading";
import Post from "../../component/post/post";
import "./home.css";
function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const user = useSelector((state) => state.user); // Assuming you have access to the logged-in user's ID through Redux
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (!user) return; // Skip if user is undefined
  
    const role = parseInt(user.role);
    if (role === 0 || role === 1) {
      setIsAdmin(true);
    }
  }, [user]);
  

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (!user) return; // Skip if user is undefined
  
    fetchPosts();
  
    // Clean up scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [user]);
  useEffect(() => {
    fetchPosts();

    // Clean up scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [user._id]); // Add user._id as a dependency to refetch posts when the user changes

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
      .get(`https://northtechcommunity3.onrender.com/post?page=${page}&pageSize=20&userId=${user._id}`) // Pass the logged-in user's ID as a query parameter
      .then((response) => {

        const { docs, hasNextPage } = response.data.message;
        setPosts(docs);
        setHasMore(hasNextPage);
        setIsLoading(false);
      })
      .catch((error) => {

        setIsLoading(false);
      });
  };

  return (
    <>
  {isAdmin?null: <PostShare />}

 {posts.map((post) => {
  

  return <Post key={post._id} post={post} />;
})}

  
  {isLoading && <Loading />}
</>

  );
  
}

export default Home;
