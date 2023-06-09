import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Stack } from "@mui/system";
import { Add } from "@mui/icons-material";

export default function AddSocialmedia(props) {
  const [open, setOpen] = React.useState(false);
  const [inputValues, setInputValues] = React.useState({});
  const [image, setImage] = React.useState(false);
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
  
    
    
    
      const form = new FormData();
      form.append("media", image);
      try {
        const response = await axios.post(
          `https://northtechcommunity3.onrender.com/${props.url}`,
         {user:props.user, ...inputValues}
        );
       
        handleFormResponse(response.data.message);
        toast.success("Links Added Successful");
      } catch (err) {
        toast.error("Error add Admin, please try again");
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
          Add Social Media Link
        </DialogTitle>

        <DialogContent sx={{ backgroundColor: "#24292f", color: "white" }}>
          <form onSubmit={handleSubmit}>
            {props.inputFields.map((input, index) => {
              if (input.type === "file") {
                return (
                  <>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Button
                        variant="outlined"
                        component="label"
                        sx={{
                          border: 0,
                          backgroundColor: "transparent",
                          "&:hover": {
                            backgroundColor: "transparent !important",
                            borderColor: "transparent !important",
                            border: "0 solid transparent !important",
                          },
                        }}
                      >
                        <input
                          accept=".png, .jpg, .jpeg"
                          type="file"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                        />
                      </Button>
                    </Stack>
                  </>
                );
              } else {
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
              }
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
