import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {  useSelector } from 'react-redux';
import FriendComponent from './friend/friend';
import { Link } from 'react-router-dom';
import AcceptedFriend from './friend/acceptedFriend';
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const user = useSelector((state) => state.user);
const [friendAcc,setFriendAcc]=useState([])
  const [friend,setFriend]=useState([])
    useEffect(()=>{
  axios.get(`https://northtechcommunity3.onrender.com/friend/request/${user._id}`).then((response)=>{

  setFriend(response.data.message)
  }).catch((err)=>{
 
  })
    },[user._id])
    useEffect(()=>{
      axios.get(`https://northtechcommunity3.onrender.com/friend/accepted/${user._id}`).then((response)=>{
      ;
        setFriendAcc(response.data.message)
        }).catch((err)=>{
     
        })
      },[user._id])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Friend Request" {...a11yProps(0)} />
          <Tab label="My Friend" {...a11yProps(1)} />
         
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {(friend.length>0)?( friend.map((friend) => (
    <FriendComponent key={friend.id} friend={friend} />
  ))):<section className='acceptedFriend'><div className='unhotorized'>
  <div className="unhotorizedcontainer">
    <div className="text">{'>_ '}<Link to=''>No request yet.</Link><span className="line">{'∣'}</span></div>
  </div></div></section>}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {(friendAcc.length>0)?( friendAcc.map((friend) => (
    <AcceptedFriend key={friend.id} friend={friend} />
  ))):<section className='acceptedFriend'><div className='unhotorized'>
  <div className="unhotorizedcontainer">
    <div className="text">{'>_ '}<Link to=''>No friend yet.</Link><span className="line">{'∣'}</span></div>
  </div></div></section>}

      </TabPanel>
    
    </Box>
  );
}