import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventShare from "../../component/addEvent";
import EventComponent from "../../component/eventComponent/eventComponent"

function Event(){
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const user = useSelector((state) => state.user); // Assuming you have access to the logged-in user's ID through Redux
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
      const role=parseInt(user.role)
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
        .get(`https://northtechcommunity3.onrender.com/event`) // Pass the logged-in user's ID as a query parameter
        .then((response) => {
     
        setPosts(response.data.message)
        })
        .catch((error) => {
  
          setIsLoading(false);
        });
    };

      const handleResponseData = (message) => {
        setPosts((prevPosts) => [...prevPosts, message]);
      };
      
    
  
return(
    <section className="event">
      {!isAdmin?( <EventShare handleResponse={handleResponseData}/>):null}
       
        {posts.map((post) =>(
 <EventComponent key={post.id} event={post}/>
        ))}
   
        </section>
)
}
export default Event