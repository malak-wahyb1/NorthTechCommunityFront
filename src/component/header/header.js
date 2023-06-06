import './header.css';
import { useSelector } from 'react-redux';
import UserProfile from '../userProfile';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useState, useEffect } from 'react';
import { Person } from '@mui/icons-material';
import logo from './logo.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Header() {
  const users = useSelector(state => state.user);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const role = parseInt(users.role)
    if (role === 0 || role === 1) {
      setIsAdmin(true);
    }
  }, [users]);

  useEffect(() => {
    axios.get('https://northtechcommunity3.onrender.com/user')
      .then((response) => {
        setUser(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const filteredUsers = user.filter((user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  }, [user, searchQuery]);

  const renderUserDropdown = () => {
    if (filteredUsers.length === 0|| filteredUsers.length >5) {
      return null; // Don't render the dropdown if there are no filtered users
    }
    return (
      <div className="user-dropdown">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-dropdown-item">
            <img className='userSearched' src={user.media} alt=""/>
           <Link to={`/user/profile/${user._id}`}>{user.first_name}</Link> 
          </div>
        ))}
      </div>
    );
  };

  if (isAdmin) {
    return (
      <>
        <div className="wrapper">
          <div className="header">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {renderUserDropdown()}
            </div>
            <div className="user-settings">
              <Person />
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
              <img src={logo} alt="" className='logoSearch'/>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {renderUserDropdown()}
            </div>
            <div className="user-settings">
              <img className="user-img" src={users.media} alt="" />
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
