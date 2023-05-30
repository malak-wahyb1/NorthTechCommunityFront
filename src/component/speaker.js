import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Person2 } from "@mui/icons-material";

export default function Speaker({ onSpeakerChange }) {
  const [cities, setCities] = React.useState([]);


  React.useEffect(() => {
    axios
      .get('https://northtechcommunity3.onrender.com/user')
      .then((response) => {
        const speakersData = response.data.message;
        if (Array.isArray(speakersData)) {
          const cityNames = speakersData.map((speaker) => speaker.first_name);
          setCities(cityNames);
        } else if (typeof speakersData === 'object') {
          setCities([speakersData.first_name, speakersData.last_name]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSpeakerChange = (event, value) => {
    const speakers = value.map((speakerName) => {
      const speaker = cities.find((city) => city.first_name === speakerName);
      return speaker ? speaker._id : null;
    });
   
    onSpeakerChange(speakers);
  };
  

  return (
    <Box sx={{ width: 200 }}>
      <Autocomplete
        multiple
        disablePortal
        options={cities}
        onChange={handleSpeakerChange}
        renderInput={(params) => (
          <TextField {...params} label={<Person2 sx={{color:"gray"}}/>} />
        )}
      />
    </Box>
  );
}
