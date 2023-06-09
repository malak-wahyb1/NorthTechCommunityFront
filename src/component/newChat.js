
import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Person2 } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { storeNewChat } from "../redux/reducer";
import { newChat } from "./logic";
export default function NewChat({ onSpeakerChange }) {
  const [cities, setCities] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleListItemClick = (event, value) => {
    const selectedValue = value || (event && event.target && event.target.value);
    if (typeof selectedValue === 'string') {
      const speaker = cities.find((city) => city.first_name === selectedValue);
      const speakerId = speaker ? speaker._id : null;
      
      axios
        .post("https://northtechcommunity3.onrender.com/chat", { user1: user._id, user2: speakerId })
        .then((response) => {
         
          const users = response.data.user;
          dispatch(storeNewChat(newChat(user, users)));
        })
        .catch((error) => {
       
        });
    } else {
      // Handle the case when selectedValue is not a string
  
    }
  };

  useEffect(() => {
    axios
      .get("https://northtechcommunity3.onrender.com/user")
      .then((response) => {
        const speakersData = response.data.message;
        if (Array.isArray(speakersData)) {
          const cityNames = speakersData.map((speaker) => speaker.first_name);
          setCities(cityNames);
        } else if (typeof speakersData === "object") {
          setCities([speakersData.first_name, speakersData.last_name]);
        }
      })
      .catch((error) => {
      
      });
  }, []);

  return (
    <Box sx={{ width: 200 }}>
      <Autocomplete
        disablePortal
        options={cities}
        onChange={handleListItemClick}
        renderInput={(params) => (
          <TextField {...params} label={<Person2 sx={{ color: "gray" }} />} />
        )}
      />
    </Box>
  );
}

