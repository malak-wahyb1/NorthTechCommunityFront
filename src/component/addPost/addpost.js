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
    const form = new FormData();

    form.append("description", content);
   if(media) form.append("media", media);
    form.append("user", users._id);
    axios
      .post("https://northtechcommunity3.onrender.com/post", form)
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
        toast.error("Try Again", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };
  return (
    <div className="PostShare">
      <img src={`https://northtechcommunity3.onrender.com/${users.media}`} alt="" />

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
