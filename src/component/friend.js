import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemText } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { storeNewChat } from "../redux/reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { blue } from "@mui/material/colors";
import axios from "axios";
import { useSelector } from "react-redux";
import { Friendacc, getImage, getId, newChat } from "./logic";
import { Input } from "@mui/base";
const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [friend1, setFriend1] = useState([]);
  const user = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Track if search query is empty
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose(selectedValue);
    setSearchQuery("");
    setIsSearching(false); // Reset search state
  };

  const handleListItemClick = (value) => {
    onClose(value);
    console.log(user._id, value);
    axios
      .post("http://localhost:5000/chat", { user1: user._id, user2: value })
      .then((response) => {
        console.log(response.data.user);
        const users = response.data.user;
        dispatch(storeNewChat(newChat(user, users)));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/friend/${user._id}`)
      .then((response) => {
        console.log(response.data.message.docs);
        setFriend1(response.data.message.docs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user._id]);

  const filteredFriends = friend1.filter((first_name) =>
    Friendacc(user, first_name.friend)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearching(value !== ""); // Update search state based on query
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ bgcolor: "#24292f", color: "white" }}>
        Friend
      </DialogTitle>
      <List sx={{ bgcolor: "#24292f", color: "white", pt: 0 }}>
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />

        {/* Conditionally render friend list based on search state */}
        {isSearching ? (
          filteredFriends.map((email) => (
            <ListItem disableGutters>
              <ListItemButton
                onClick={() => handleListItemClick(getId(user, email.friend))}
                key={email}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                    <img src={getImage(user, email.friend)} alt="" />
                  </Avatar>
                </ListItemAvatar>
                {Friendacc(user, email.friend)}
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem disableGutters>
            {/* Render empty state or prompt when search query is empty */}
            <ListItemButton>
              <ListItemText primary="Start typing to search friends" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function Friend() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Chat
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}