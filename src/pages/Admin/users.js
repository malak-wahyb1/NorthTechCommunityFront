import { Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteComponent from "../../component/editpost";
import DataGridPremiumDemo from "../../component/table";
import "./admin.css";
export function Users() {
  const [admin, setAdmin] = useState([]);
  useEffect(() => {
    axios
      .get("https://northtechcommunity3.onrender.com/user")
      .then((response) => {
        setAdmin(response.data.message.map((row) => ({ ...row, id: row._id })));
      })
      .catch((error) => {});
  }, []);
  const columns = [
    
    { field: "first_name", headerName: "FirstName", width: 150 },
    { field: "last_name", headerName: "LastName", width: 150 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "phone", headerName: "Phone", width: 250 },

    { field: "media", headerName: "Image", width: 200,renderCell:(params)=>{
        return <Avatar alt="Remy Sharp" src={params.row.media} />
      }  },
    {
      field: "Action",
      headerName: "Action",
      width:150 ,
      renderCell: (params) => {
        return <DeleteComponent url="user" Id={params.row._id} title="user" />;
      },
    },
  ];
  return (
    <div className="adminAcc">
      <DataGridPremiumDemo columns={columns} rows={admin} />
    </div>
  );
}
