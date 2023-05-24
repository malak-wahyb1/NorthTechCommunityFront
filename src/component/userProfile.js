import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function UserProfile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
 
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const lougout=()=>{
    localStorage.removeItem("userInfo");
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
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
        <MenuItem onClick={handleClose}>My Profile</MenuItem>
        <MenuItem onClick={lougout} >Logout</MenuItem>
      </Menu>
    </div>
  );
}