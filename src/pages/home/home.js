import axios from "axios";
import { useEffect, useState } from "react";
import PostShare from "../../component/addPost/addpost";
import Post from "../../component/post/post";

import "./home.css";

function Home() {
  const [post,setPost]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:5000/post").then((response)=>{
  setPost(response.data.message.docs)
    }).catch((error)=>{console.log(error)})
  },[])

  return (
    <>
    <PostShare/>
     {post.map((post)=>{
      return(
        <Post post={post}/>
      )
     })}
    </>
  );
}
export default Home;
