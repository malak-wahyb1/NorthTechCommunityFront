import React, { useState, useEffect } from "react";
import axios from "axios";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import Comment from "@mui/icons-material/Comment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteComponent from "../editpost";
import "./post.css";
import EditFormLogged from "../editpostlogged";

function Post(props) {
  const [style, setStyle] = useState("cont");
  const [clicked, setClicked] = useState(false);
  const [likesNb, setLikesNb] = useState([]);
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState("close");
  const [commentClicked, setCommentClicked] = useState(false);
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [post, setPost] = useState(props.post);
  const logged = props.logged;
  useEffect(() => {
    const role = parseInt(user.role);
    if (role === 0 || role === 1) {
      setIsAdmin(true);
    }
  }, [user]);

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
      .post("https://northtechcommunity3.onrender.com/comment", commentBack)
      .then((response) => {
        setContent("");
      })
      .catch((error) => {});
  };

  const openComment = () => {
    setCommentClicked(!commentClicked);
    setOpen("comments");
    if (commentClicked) {
      setOpen("comments");
      axios
        .get(`https://northtechcommunity3.onrender.com/${user._id}/${props.post._id}`)
        .then((response) => {
          setComments(response.data.message);
        
        })
        .catch((error) => {});
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
        .post("https://northtechcommunity3.onrender.com/like", likeData)
        .then((response) => {
          localStorage.setItem(`liked_${props.post._id}`, "true");
          setLikesNb([...likesNb, response.data.message[0]]);
        })
        .catch((error) => {});
    } else {
      axios
        .delete(`https://northtechcommunity3.onrender.com/like/${user._id}/${props.post._id}`)
        .then((response) => {
          const deletedLikeId = response.data.message._id;
          const updatedLikeNb = likesNb.filter(
            (like) => like._id !== deletedLikeId
          );
          setLikesNb(updatedLikeNb);
        })

        .catch((error) => {});

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
      .get(`https://northtechcommunity3.onrender.com/like/${props.post._id}`)
      .then((response) => {
        setLikesNb(response.data.message);
      })
      .catch((error) => {});
  }, [props.post._id]);
  const handleFormResponse = (message) => {
    setPost(message);

  };
  return (
    <>
      <div id="wrapper">
        <header className="cf">
        <Link to={`/user/profile/${post.user && post.user._id}`}>
              {props.post.user && (
                <img
                  className="profile-pic"
                  src={`https://northtechcommunity3.onrender.com/${props.post.user.media}`}
                  alt=""
                />
              )}
            </Link>
          <h1 className="name">
          <Link to={`/user/profile/${props.post.user._id}`}>
              {props.post.user.first_name} {props.post.user.last_name}
            </Link>
          </h1>
          {isAdmin ? (
            <DeleteComponent url="post" Id={post._id} title="post" />
          ) : null}
          {logged ? (
            <>
              <DeleteComponent url="post" Id={post._id} />
              <EditFormLogged
                inputFields={[
                  { name: "description", label: "Description", type: "text" },
                ]}
                title="Post"
                url={`post/${props.post._id}`}
                handleFormResponse={handleFormResponse}
              />
            </>
          ) : null}
          <p className="date">{post.createAt}</p>
        </header>
        <section className="post-content">
          <p className="status">{post.description}</p>
          <img
            className="img-content"
            src={post.media}
            alt=""
          />
        </section>
        <div className="borderTop"></div>
        {isAdmin ? null : (
          <div className="action">
            <div className="like">
              <Link className={style} onClick={changeStyle}>
                <ThumbUpAltOutlinedIcon />
                {likesNb.length > 0 && <span>{likesNb.length}</span>}
                {likesNb.length === 0 && <span>Like</span>}
              </Link>
            </div>

            <div className="comment">
              <Link onClick={openComment}>
                <Comment />
                <span>Comment</span>
              </Link>
            </div>
          </div>
        )}

        <div className={open}>
          {comments.map((comment) => {
            return (
              <ul className="commentList" key={comment._id}>
                <li>
                  <div className="commenterImage">
                    <img
                      src={`https://northtechcommunity3.onrender.com/${comment.user.media}`}
                      alt=""
                    />
                  </div>
                  <div className="commentText">
                    <span className="name-user-comment">
                      {comment.user.first_name} {comment.user.last_name}
                    </span>
                    <p className="">{comment.content}</p>{" "}
                    <span className="date sub-text">{comment.created_at}</span>
                  </div>
                </li>
              </ul>
            );
          })}

          <div className="commentBox">
            <img
              src={`https://northtechcommunity3.onrender.com/${user.media}`}
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
          <div className="commentHelper">
            <div className="icon comment"></div>

            <Link to={`/user/post/${props.post._id}`}>View All comments</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
