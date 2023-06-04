import React, { useState, useRef } from "react";
import "./addpost.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import axios from "axios";

const PostShare = () => {
  const users = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [imgFromBB, setImgFromBB] = useState("");
  const [image, setImage] = useState();
  const [media, setMedia] = useState(null);
  const imageRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setMedia(event.target.files[0]);
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };
  const handleSubmitPost = (e) => {
    e.preventDefault();
if(media){
  const fd = new FormData();
  fd.append("image", media, media.name);
  axios.post(
    "https://api.imgbb.com/1/upload?key=8bcd9d41626f3d033a74947d3f950fda",
    fd
  ).then((response) => {
    console.log(response.data.data.display_url);
    axios
    .post("https://northtechcommunity3.onrender.com/post", {description:content,media:response.data.data.display_url,user:users._id})
    .then((response) => {
      toast.success("Post added successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setContent("");
      setMedia("");
      setImage(null);
    })
    .catch((error) => {
      console.log(error)
      toast.error("Try Again", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    });
  }).catch((err) => {
    console.log(err.message);
  })
}else{
 
  axios
    .post("https://northtechcommunity3.onrender.com/post", {description:content,user:users._id})
    .then((response) => {
      toast.success("Post added successfully", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setContent("");
      setMedia("");
      setImage(null);
    })
    .catch((error) => {
      console.log(error)
      toast.error("Try Again", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    });
}
   
   
  };
  return (
    <div className="PostShare">
      <img src={users.media} alt="" />

      <div>
        <form onSubmit={handleSubmitPost}>
          <input
            type="text"
            value={content}
            placeholder="What's happening"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            required
          />
          <div className="postOptions">
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current.click()}
            >
              <UilScenery />
              Photo
            </div>

            <button className="buttonPs" type="submit">
              Share
            </button>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>
        </form>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={image.image} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
