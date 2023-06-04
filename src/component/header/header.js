import './header.css';
import { useSelector } from 'react-redux';
import UserProfile from '../userProfile';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useState, useEffect } from 'react';
import { Person } from '@mui/icons-material';


function Header() {
  const users = useSelector(state => state.user);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const role=parseInt(users.role)
    if (role === 0 || role === 1) {
      setIsAdmin(true);
    }
  }, [users]);

  if (isAdmin) {
    return (
      <>
        <div className="wrapper">
          <div className="header">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
            </div>
            <div className="user-settings">
                <Person/>
              <div className="user-name">{users.username}</div>
              <UserProfile />
             
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="wrapper">
          <div className="header">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
            </div>
            <div className="user-settings">
              <img
           
                className="user-img"
                src={users.media}
                alt=""
              />
              <div className="user-name">{users.first_name}</div>
              <UserProfile />
              <div className="notify">
                <div className="notification"></div>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  0
                  <NotificationsNoneIcon />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
