import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useDispatch } from "react-redux";

import { toast } from "react-hot-toast";
import { Stack } from "@mui/system";
import { Add } from "@mui/icons-material";

export default function AddAdminForm(props) {
  const [open, setOpen] = React.useState(false);
  const [inputValues, setInputValues] = React.useState({});
 
  const { handleFormResponse } = props;
  const handleInputChange = (e) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://northtechcommunity3.onrender.com/${props.url}`,
        inputValues
      );
      toast.success("Admin added successful");
   
      handleFormResponse(response.data.message)
    } catch (err) {
      toast.error(err.message);
    }
   
  };

  return (
    <section className="addForm">
      <Add
        sx={{
          color: "#15bab3",
          width: "30px",
          zIndex: "10000",
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={handleClickOpen}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: "white", backgroundColor: "#24292f" }}>
          Edit {props.title}
        </DialogTitle>

        <DialogContent sx={{ backgroundColor: "#24292f", color: "white" }}>
          <form onSubmit={handleSubmit}>
            {props.inputFields.map((input, index) => {
             
                return (
                  <TextField
                    key={index}
                    variant="standard"
                    margin="dense"
                    id={input.id}
                    label={input.label}
                    type={input.type}
                    fullWidth
                    name={input.name}
                    onChange={handleInputChange}
                    InputProps={{
                      style: {
                        color: "white",
                      },
                    }}
                  />
                );
              
            })}
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
