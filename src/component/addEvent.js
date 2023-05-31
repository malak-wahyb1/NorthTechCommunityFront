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
    const form = new FormData();

    form.append("event_name", content);
    form.append("event_link", link);
    form.append("address", selectedCity);
    form.append("date", selectedDate);
    form.append("time", selectedTime);
    form.append("media", media);
    form.append("posted", users._id);
console.log(selectedSpeakers);
    axios
      .post("https://northtechcommunitymalakwahyb.onrender.com/event", form)
      .then((response) => {
        console.log(response)
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
        console.log(error);
      });
  };

  return (
    <div className="PostShare">
      <img src={`https://northtechcommunitymalakwahyb.onrender.com/${users.media}`} alt="" />
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
