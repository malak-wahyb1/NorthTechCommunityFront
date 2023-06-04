import React, { useState, useRef } from "react";
import { UilScenery } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import ResponsiveDatePickers from "./datePicker";
import ResponsiveTimePickers from "./timePicker";
import CountrySelect from "./location";
import SendIcon from '@mui/icons-material/Send';
const EventShare = (props) => {
  const users = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [image, setImage] = useState(null);
  const [media, setMedia] = useState(null);
  const imageRef = useRef();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [imgFromBB, setImgFromBB] = useState("");
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);
const{handleResponse}=props
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setMedia(event.target.files[0]);
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };



  const handleSubmitPost = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("image", media, media.name);
    axios.post(
      "https://api.imgbb.com/1/upload?key=8bcd9d41626f3d033a74947d3f950fda",
      fd
    ).then((response) => {
      axios
      .post("https://northtechcommunity3.onrender.com/event", {
        event_name:content,
        event_links:link,
        address:selectedCity,
        date:selectedDate,
        time:selectedTime,
        media:response.data.data.display_url,
        posted:users._id
      })
      .then((response) => {
      
        handleResponse(response.data.message)
        toast.success("Event added successfully", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setContent("");
        setLink("");
        setSelectedDate("");
        setSelectedTime("");
        setSelectedCity("");
        setSelectedSpeakers([]);
        setMedia("");
        setImage("");
      })
      .catch((error) => {
        toast.error("Try agin", {
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
   
  };

  return (
    <div className="PostShare">
      <img src={users.media} alt="" />
      <div>
        <form onSubmit={handleSubmitPost}>
          <div className="NewEvent">
            <input
              type="text"
              value={content}
              placeholder="Name"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              required
            />

            <CountrySelect onCityChange={handleCityChange} />
       
            <input
              type="link"
              value={link}
              placeholder="Links"
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
          </div>
          <div className="postOptions">
            <div className="option">
              <ResponsiveDatePickers onDateChange={handleDateChange} />
         
            </div>
            <div className="option">
            <ResponsiveTimePickers onTimeChange={handleTimeChange} />
         
            </div>
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current.click()}
            >
              <UilScenery />
         
            </div>
            <button className="buttonPs" type="submit">
              <SendIcon/>
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

export default EventShare;
