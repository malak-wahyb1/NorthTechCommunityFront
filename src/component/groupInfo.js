import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';

import VisibilityIcon from '@mui/icons-material/Visibility';
const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{props.name} Info</DialogTitle>
      <EditIcon/>
      <List sx={{ pt: 0 }}>
        {props.users.map((email) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <img src={`http://localhost:5000/${email.media}`} alt=""/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email.first_name} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function GroupInfo(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
console.log(props)
  const handleClickOpen = (props) => {
    setOpen(true);
  
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
   
      <Button variant="outlined" onClick={handleClickOpen}>
        <VisibilityIcon/>
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        users={props.users}
        name={props.name}
      />
    </div>
  );
}