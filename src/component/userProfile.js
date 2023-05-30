import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function UserProfile() {
  const users = useSelector(state => state.user);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const { from: { pathname: login } = { pathname: "/" } } =
    location.state || {};
  const navigate = useNavigate();
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const lougout=()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token")
    navigate(login)
    setAnchorEl(null);
    
}
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
    <svg viewBox="0 0 492 492" fill="currentColor">

        <ArrowDropDownIcon/>
        </svg>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
   
      >
       
        <MenuItem onClick={handleClose} ><Link to={`/user/${users._id}`}>My Profile</Link></MenuItem>
        <MenuItem onClick={lougout} >Logout</MenuItem>
      </Menu>
    </div>
  );
}