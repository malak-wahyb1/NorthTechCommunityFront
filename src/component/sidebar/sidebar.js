import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import React, { useEffect, useState } from "react";
import GroupIcon from '@mui/icons-material/Group';
import { Link } from "react-router-dom";
import "./sidebar.css";
import EventNoteIcon from '@mui/icons-material/EventNote';

import CommentIcon from '@mui/icons-material/Comment';
import logo from './logo.svg'
import { useSelector } from 'react-redux';
import { Person } from '@mui/icons-material';

function SideBar() {
  const user = useSelector((state) => state.user);

  const [activeLink, setActiveLink] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const role=parseInt(user.role)
    if (role === 0 || role === 1) {
      setIsAdmin(true);
    }
  }, [user]);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="sidebar">
      <span className="logo"></span>
      <Link className="logo-expand"><img src={logo} alt=""/></Link>
      <main className="side-wrapper">
     
        <section className="side-menu">
          <Link
            className={`sidebar-link discover ${
              activeLink === "dashboard" ? "is-active" : ""
            }`}
            to="/user/home"
            onClick={() => handleLinkClick("dashboard")}
          >
             <svg viewBox="0 0 24 24" fill="currentColor">
              <DynamicFeedIcon/>
              </svg>
            <span className="media">Posts</span>
          </Link>
          {isAdmin?(<Link
            className={`sidebar-link trending ${
              activeLink === "admin" ? "is-active" : ""
            }`}
            to="/user/admin/adminacc"
            onClick={() => handleLinkClick("admin")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
               <GroupIcon/>
              </svg>
            <span className="media">Admin</span>
          </Link>):(<Link
            className={`sidebar-link trending ${
              activeLink === "admin" ? "is-active" : ""
            }`}
            to="/user/friend"
            onClick={() => handleLinkClick("admin")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
               <GroupIcon/>
              </svg>
            <span className="media">Friend</span>
          </Link>)}
          
          <Link
            className={`sidebar-link ${
              activeLink === "order" ? "is-active" : ""
            }`}
            to="/user/event"
            onClick={() => handleLinkClick("order")}
          >
             <svg viewBox="0 0 24 24" fill="currentColor">
                <EventNoteIcon/>
              </svg>
            <span className="media">Event</span>
          </Link>
         
          {isAdmin?(  <Link
            className={`sidebar-link ${
              activeLink === "medicine" ? "is-active" : ""
            }`}
            to="/user/admin/users"
            onClick={() => handleLinkClick("medicine")}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <Person/>
              </svg>
            <span className="media">Users</span>
          </Link>
         ):(  <Link
          className={`sidebar-link ${
            activeLink === "medicine" ? "is-active" : ""
          }`}
          to="/user/chat"
          onClick={() => handleLinkClick("medicine")}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <CommentIcon/>
            </svg>
          <span className="media">Chats</span>
        </Link>
       )}
        
        </section>
      </main>
    </nav>
  );
}

export default SideBar;