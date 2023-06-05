import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Delete from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-hot-toast";

function DeleteComponent(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDelete = () => {

    setOpen(false);
console.log(props.url,props.Id)
    axios
      .delete(`https://northtechcommunity3.onrender.com/${props.url}/${props.Id}`)
      .then((response) => {
        toast.success(`${props.url} deleted successfully`, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
       
      })
      .catch((error) => {
        console.log(error)
        toast.error("try again", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
      });
  };

  return (
    <div>
      <Button
        name="delete team"
       
        onClick={handleClickOpen}
        sx={{
      
          color: "#15bab3",
        }}
      >
        {<Delete  sx={{color:"#15bab3"}} />}
       
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            color: "#f4f4f9",
            backgroundColor: "#24292f",
            
          }}
        >
          {`Are you sure do you want to delete this ${props.title}?`}
        </DialogTitle>
        <DialogActions
          sx={{
            backgroundColor: "#24292f",
          }}
        >
          <Button onClick={handleClose} sx={{ color: "#f4f4f9" }}>
            Cancle
          </Button>
          <Button
            onClick={handleCloseDelete}
            variant="contained"
            autoFocus
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteComponent;