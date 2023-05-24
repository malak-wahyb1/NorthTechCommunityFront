import React, { useState, useEffect } from "react";
import axios from "axios";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import Comment from "@mui/icons-material/Comment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./post.css";

function Post(props) {
  const [style, setStyle] = useState("cont");
  const [clicked, setClicked] = useState(false);
  const [likesNb, setLikesNb] = useState([]);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState("close");
  const [commentClicked, setCommentClicked] = useState(false);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);


  const handleCommentSubmit = () => {
    if (content.trim() === "") {
      return;
    }
    const commentBack = {
      content: content,
      user: user._id,
      post: props.post._id,
    };
    axios
      .post("http://localhost:5000/comment", commentBack)
      .then((response) => {
        console.log(response);
        setContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const openComment = () => {
    setCommentClicked(!commentClicked);
    setOpen("comments");
    if (commentClicked) {
      setOpen("comments");
      axios
        .get(`http://localhost:5000/comment/user/${user._id}/${props.post._id}`)
        .then((response) => {
      console.log(response.data)
          setComments(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setOpen("close");
    }
  };

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    if (likedPosts.includes(props.post._id)) {
      setClicked(true);
      setStyle("cont2");
    }
  }, [props.post._id]);

  const changeStyle = () => {
    if (!clicked) {
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
      const updatedLikedPosts = [...likedPosts, props.post._id];
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));

      setClicked(true);
      setStyle("cont2");

      const likeData = { post: props.post._id, user: user._id };
      axios
        .post("http://localhost:5000/like", likeData)
        .then((response) => {
          console.log(response);
          localStorage.setItem(`liked_${props.post._id}`, "true");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .delete(`http://localhost:5000/like/${user._id}/${props.post._id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
      const updatedLikedPosts = likedPosts.filter(
        (post) => post !== props.post._id
      );
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));

      setClicked(false);
      setStyle("cont");
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCommentSubmit();
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/like/${props.post._id}`)
      .then((response) => {
        setLikesNb(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.post._id]);
  return (
    <>
      <div id="wrapper">
        <header className="cf">
          <img
            src="http://2016.igem.org/wiki/images/e/e0/Uclascrolldown.png"
            className="arrow"
            alt=""
          />
          <a>
            <img
              className="profile-pic"
              src={`http://localhost:5000/${props.post.user.media}`}
              alt=""
            />
          </a>
          <h1 className="name">
            <a href="#">
              {props.post.user.first_name}
              {props.post.user.last_name}
            </a>
          </h1>
          <p className="date">{props.post.createAt}</p>
        </header>

        <p className="status">{props.post.description}</p>
        <img
          className="img-content"
          src={`http://localhost:5000/${props.post.media}`}
          alt=""
        />

        <div className="action">
          <div className="like">
            <a href="#" className={style} onClick={changeStyle}>
              <ThumbUpAltOutlinedIcon />
              {likesNb.length > 0 && <span>{likesNb.length}</span>}
              {likesNb.length === 0 && <span>Like</span>}
            </a>
          </div>

          <div className="comment">
            <a href="#" onClick={openComment}>
              <Comment />
              <span>Comment</span>
            </a>
          </div>
        </div>
        <div class={open}>
          {comments.map((comment, i) =>{
            return( <ul class="commentList">
            <li>
              <div class="commenterImage">
                <img src={`http://localhost:5000/${comment.user.media}`} alt="" />
              </div>
              <div class="commentText">
                <span className="name-user-comment">{comment.user.first_name} {comment.user.last_name}</span>
                <p class="">{comment.content}</p>{" "}
                <span class="date sub-text">{comment.created_at}</span>
              </div>
            </li>
         
        
          </ul>)
          })}
         
          <div className="commentBox">
            <img
              src={`http://localhost:5000/${user.media}`}
              alt=""
              className="user-img"
            />
            <input
              placeholder="Write a comment..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            ></input>
          </div>
          <div class="commentHelper">
            <div class="icon comment"></div>

  
            <Link to={`/user/post/${props.post._id}`}>View All comments</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
