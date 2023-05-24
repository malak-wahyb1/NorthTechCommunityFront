import { Comment } from "@mui/icons-material";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function SinglePost(props) {
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const [style, setStyle] = useState("cont");
  const [clicked, setClicked] = useState(false);
  const [likesNb, setLikesNb] = useState([]);
  const [user, setUser] = useState([]);
  const currentUser = useSelector((state) => state.user);

  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${postId}`)
      .then((response) => {
        setUser(response.data.message.user);
        setPost(response.data.message);
      })
      .catch((error) => {});
    axios
      .get(`http://localhost:5000/like/${postId}`)
      .then((response) => {
        setLikesNb(response.data.message);
      })
      .catch((error) => {});
      axios
      .get(`http://localhost:5000/comment/${postId}`)
      .then((response) => {
        console.log(response);
        setComments(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);
  const handleCommentSubmit = () => {
    if (content.trim() === "") {
      return;
    }
    const commentBack = {
      content: content,
      user: currentUser._id,
      post: postId,
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
  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    if (likedPosts.includes(postId)) {
      setClicked(true);
      setStyle("cont2");
    }
  }, [postId]);

  const changeStyle = () => {
    if (!clicked) {
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
      const updatedLikedPosts = [...likedPosts, postId];
      localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));

      setClicked(true);
      setStyle("cont2");

      const likeData = { post: postId, user: currentUser._id };
      axios
        .post("http://localhost:5000/like", likeData)
        .then((response) => {
          console.log(response);
          localStorage.setItem(`liked_${postId}`, "true");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .delete(`http://localhost:5000/like/${currentUser._id}/${postId}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
      const updatedLikedPosts = likedPosts.filter((post) => post !== postId);
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
  if (post) {
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
                src="://scontent-atl3-1.xx.fbcdn.net/v/t1.0-1/p320x320/15181_10152546593877801_7195567909714140576_n.png?oh=bdab6394098ec9afbdf619bb17f155b9&oe=5893B18E"
                alt=""
              />
            </a>
            <h1 className="name">
              <a href="#">
                {user.first_name}
                {user.last_name}
              </a>
            </h1>
            <p className="date">{post.createAt}</p>
          </header>

          <p className="status">{post.description}</p>
          <img
            className="img-content"
            src={`http://localhost:5000/${post.media}`}
            alt=""
          />

          <div className="action">
            <div className="like">
              <a href="#" className={style} onClick={changeStyle}>
                <ThumbUpAltOutlined />
                {likesNb.length > 0 && <span>{likesNb.length}</span>}
                {likesNb.length === 0 && <span>Like</span>}
              </a>
            </div>

            <div className="comment">
              <a href="#">
                <Comment />
                <span>Comment</span>
              </a>
            </div>
          </div>
          <div>
            {comments &&
              comments.map((comment, i) => {
                return (
                  <ul class="commentList">
                    <li>
                      <div class="commenterImage">
                        <img
                          src={`http://localhost:5000/${comment.user.media}`}
                          alt=""
                        />
                      </div>
                      <div class="commentText">
                        <span className="name-user-comment">
                          {comment.user.first_name} {comment.user.last_name}
                        </span>
                        <p class="">{comment.content}</p>{" "}
                        <span class="date sub-text">{comment.created_at}</span>
                      </div>
                    </li>
                  </ul>
                );
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
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default SinglePost;
