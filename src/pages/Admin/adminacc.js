import axios from "axios";
import { useEffect, useState } from "react";
import AddForm from "../../component/addForm";
import DeleteComponent from "../../component/editpost";
import DataGridPremiumDemo from "../../component/table";
import "./admin.css";
export function AdminAcc() {
  const [admin, setAdmin] = useState([]);
  useEffect(() => {
    axios
      .get("https://northtechcommunitymalakwahyb.onrender.com/admin")
      .then((response) => {
        setAdmin(response.data.message.map((row) => ({ ...row, id: row._id })));
      })
      .catch((error) => {});
  }, []);
  const handleFormResponse=(message)=>{
    console.log(message);
setAdmin(...admin,message)

  }
  const columns = [
    
    { field: "username", headerName: "Username", width: 300 },

    {
      field: "Action",
      headerName: "Action",
      width: 275,
      renderCell: (params) => {
        return <DeleteComponent url="admin" Id={params.row._id} />;
      },
    },
  ];
  return (
    <div className="adminAcc">
      <section><h1>Admin </h1>
      <AddForm    inputFields={[
                  { name: "username", label: "username", type: "text" },
                  { name: "password", label: "password", type: "text" },

                
                ]}
                title="Admin"
                url="admin"
                handleFormResponse={handleFormResponse}/>
      </section>
      <DataGridPremiumDemo columns={columns} rows={admin} />
    </div>
  );
}
