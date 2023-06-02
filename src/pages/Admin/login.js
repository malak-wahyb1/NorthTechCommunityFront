import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from './logo.svg' 
import axios from "axios";
import "react-phone-number-input/style.css";

import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { storeUser } from "../../redux/reducer";
import { storeToken } from "../../redux/reducer";


export function Login(){
 
    const [username, setEmail] = useState();
    const [password, setPassword] = useState();
   

    const location = useLocation();
    const { from: { pathname: home } = { pathname: "/user/home" } } =
      location.state || {};
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignIn = (e) => {
      e.preventDefault();
      loginRequest();
    };
    const loginRequest = () => {
      axios
        .post(`https://northtechcommunity3.onrender.com/admin/login`, { username, password })
        .then((response) => {
         
  navigate(home)
          const user = response.data.user;
          dispatch(storeUser(user));
          dispatch(storeToken(response.data.token));
        })
        .catch((error) => {
     
          const err = error.response.data.message;
          toast.error(err, {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        });
    };
    return (
        <div className="login_page">
      <div className="background-shape circle-one"></div>
      <div className="background-shape circle-two"></div>
      <div className="background-shape square-one"></div>
      <div className="background-shape square-two"></div>
      <div className="background-shape square-three"></div>
      <div className="background-shape triangle-one"></div>
      <div className="background-shape triangle-two"></div>
      <div className="background-shape triangle-three"></div>
      <div className="background-shape triangle-three1"></div>
      <div className="background-shape rectangle-one"></div>
      <div className="background-shape rectangle-two"></div>
      <div
        className={`container right-panel-active`}
      >
     
      
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
             <img src={logo} alt=""/>
            </div>
            
          </div>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={(e) => handleSignIn(e)}>
            <h1>Sign in</h1>
            <div className="social-container"></div>

            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Link href="#" className="forgot-password">
              Forgot your password?
            </Link>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
    )
}