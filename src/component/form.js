import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { storeUser } from "../redux/reducer";
import { useDispatch } from "react-redux";

import { toast } from "react-hot-toast";
import { Stack } from "@mui/system";
import { useState } from "react";

export default function FormComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [inputValues, setInputValues] = React.useState({});
  const [image, setImage] = React.useState(false);
  const dispatch = useDispatch();
  const [imgFromBB, setImgFromBB] = useState("");
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
  if(props.title==="profile"){
    try {
      const response = await axios.put(
        `https://northtechcommunity3.onrender.com/${props.url}`,
        inputValues
      );

      localStorage.removeItem("user");

      const token = localStorage.getItem("token");
      localStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data.message));
      handleFormResponse(response.data.message);
      dispatch(storeUser(response.data.message));

      toast.success("Edit successful");
    } catch (err) {
      toast.error(err.message);
    }
    if (image) {
      const fd = new FormData();
      fd.append("image", image, image.name);
      axios.post(
        "https://api.imgbb.com/1/upload?key=8bcd9d41626f3d033a74947d3f950fda",
        fd
      ).then((response) => {
        setImgFromBB(response.data.data.display_url);

        axios.put( `https://northtechcommunity3.onrender.com/${props.url}`,
        {media:response.data.data.display_url}).then((response) => {
          localStorage.removeItem("user");
  
          const token = localStorage.getItem("token");
          localStorage.clear();
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(response.data.message));
          handleFormResponse(response.data.message);
          dispatch(storeUser(response.data.message));
          toast.success("Edit successful");
        }).catch(err=>{
          toast.error("Error add Admin, please try again");
        })
      }).catch((err) => {
  
      })
     
        
      
    }}else{
      console.log(inputValues)
      axios.put( `https://northtechcommunity3.onrender.com/${props.url}`,inputValues).then((response) => {
        toast.success("Edit successful");
console.log(response);
      }).catch((err) => {
        toast.error("Try again");

      })
    }
  };

  return (
    <section className="addForm">
      <EditIcon
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
              if (input.type === "file") {
                return (
                  <>
                    <Stack direction="row" alignItems="center" spacing={2} key={index}>
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
