import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Post from "./post/post";
import { useEffect, useState } from "react";
import Loading from "./loading/loading";
import axios from 'axios';
function TabPanel(props) {

  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function LoggedUserTabs(props) {
  const [value, setValue] = React.useState(0);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    
      if (isLoading) return; // Prevent fetching if already loading
  
      setIsLoading(true);
  
      axios
        .get(`https://northtechcommunity3.onrender.com/post/user/${props.userId}`) // Adjust pageSize as per your requirement
        .then((response) => {
          
          setPosts(response.data.message);
      
          setIsLoading(false);
        })
        .catch((error) => {
       
          setIsLoading(false);
        });
    

 
  }, []);


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="My Posts" {...a11yProps(0)} />
          <Tab label="Experience" {...a11yProps(1)} />
          <Tab label="Education" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       <>
        {posts.map((post) => {
          return <Post post={post} logged="true"/>;
        })}
        {isLoading && <Loading />}
       </>

      </TabPanel>
      <TabPanel value={value} index={1}>
   hi

      </TabPanel>
    
    </Box>
  );
}