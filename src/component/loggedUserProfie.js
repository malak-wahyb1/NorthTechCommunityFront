import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FormComponent from "./form";
import LoggedUserTabs from "./loggedUserTab";
import {
  Email,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import AddSocialmedia from "./socialmedialink";
function LoggedUser() {
  const users = useSelector((state) => state.user);
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [socialMedian, setSocialMedian] = useState([]);

  const handleFormResponse = (message) => {
    setUser(message);
  };

  useEffect(() => {
    axios
      .get(`https://northtechcommunitymalakwahyb.onrender.com/user/${userId}`)
      .then((response) => {
        setUser(response.data.message);
      })
      .catch((error) => {});
  }, [userId]);
  useEffect(() => {
    axios
      .get(
        `https://northtechcommunitymalakwahyb.onrender.com/profile/${userId}`
      )
      .then((response) => {
       
        setSocialMedian(response.data.message);
        console.log(response.data)
      })
      .catch((error) => {});
  }, [userId]);
  return (
    <>
      <div className="back-to-top"></div>
      <main>
        <div className="user-header-wrapper flexbox">
          <div className="user-header-inner flexbox">
            <div className="user-header-overlay"></div>

            <img
              className="user-header"
              src={user.media}
              alt=""
            />
          </div>
        </div>
        <div className="user-info-bar-logged">
          <div className="ufo-bar-col3">
            <div className="ufo-bar-col3-inner">
              <div className="username-wrapper-outer">
                <div className="username-wrapper">
                  <h3 className="username-dev">
                    {user.first_name} {user.last_name}
                  </h3>
                  <FormComponent
                    inputFields={[
                      { name: "first_name", label: "First Name", type: "text" },
                      { name: "last_name", label: "Last Name", type: "test" },
                      { name: "media", label: "Image", type: "file" },
                    ]}
                    handleFormResponse={handleFormResponse}
                    title="Profile"
                    url={`user/${users._id}`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ufo-bar-col4">
            <div className="ufo-bar-col4-inner">
         
                <div className="ufo-bar-col4-inner"></div>
            
            </div>
          </div>
          <div className="ufo-bar-col4">
            <div className="ufo-bar-col4-inner">
              {socialMedian?(
                <div className="ufo-bar-col4-inner">
                
                   {socialMedian.Linkedin?(<section className="social_media"> <LinkedIn
                      sx={{
                        "&:hover": { color: "#15bab3", cursor: "pointer" },
                      }}
                    /></section>):null}
                  
                
                  {socialMedian.Email?  <section className="social_media"><Email
                      sx={{
                        "&:hover": { color: "#15bab3", cursor: "pointer" },
                      }}
                    /> </section>:null}  
                 
                 
                  {socialMedian.Github?<section className="social_media"><GitHub
                      sx={{
                        "&:hover": { color: "#15bab3", cursor: "pointer" },
                      }}
                    /></section>:null}
                  
                
                  {socialMedian.Facebook?<section className="social_media"><Facebook
                      sx={{
                        "&:hover": { color: "#15bab3", cursor: "pointer" },
                      }}
                    /></section>:null}
                  
                 
                  {socialMedian.Instagram? <section className="social_media"> <Instagram
                      sx={{
                        "&:hover": { color: "#15bab3", cursor: "pointer" },
                      }}
                    /> </section>:null}
                 
                  
                  {socialMedian.Twitter?<section className="social_media"><Twitter
                      sx={{
                        "&:hover": { color: "#15bab3", cursor: "pointer" },
                      }}
                    /> </section>:null}
                
                  <section className="social_media">
                    <FormComponent
                      inputFields={[
                        { name: "Linkedin", label: "Linkedin", type: "text" },
                        { name: "Email", label: "Email", type: "test" },
                        { name: "Github", label: "Github", type: "test" },
                        { name: "Facebook", label: "Facebook", type: "test" },
                        { name: "Instagram", label: "Instagram", type: "test" },
                        { name: "Twitter", label: "Twitter", type: "test" },
                      ]}
                      handleFormResponse={handleFormResponse}
                      title="Profile"
                      url={`profile/${users._id}`}
                    />
                  </section>
                </div>
              ) : (
                <AddSocialmedia
                  inputFields={[
                    { name: "Linkedin", label: "Linkedin", type: "text" },
                    { name: "Email", label: "Email", type: "test" },
                    { name: "Github", label: "Github", type: "test" },
                    { name: "Facebook", label: "Facebook", type: "test" },
                    { name: "Instagram", label: "Instagram", type: "test" },
                    { name: "Twitter", label: "Twitter", type: "test" },
                  ]}
                  handleFormResponse={handleFormResponse}
                  title="Profile"
                  url={`profile`}
                  user={users._id}
                />
              )}
            </div>
          </div>
        </div>
        <LoggedUserTabs userId={userId} />
      </main>
    </>
  );
}
export default LoggedUser;
