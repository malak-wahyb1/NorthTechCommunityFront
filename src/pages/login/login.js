import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { storeToken, storeUser } from "../../redux/reducer";
function LoginPage() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [value, setValue] = useState();
  const [signUp, setSignUp] = useState([]);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/user/home" } };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignIn = () => {
    axios
      .post(`http://localhost:5000/user/login`, { email, password })

      .then((response) => {
        const user = response.data.user;
        dispatch(storeUser(user));
        navigate(from);
        console.log(response.data.user.first_name);
      })
      .catch((error) => {
       
      });
  };
  const handleChange = (e) => {
    setSignUp({ [e.target.name]: e.target.value });
  };
  const handleSignUp = () => {
    axios
      .post(`http://localhost:5000/user`, { signUp })
      .then((response) => {
        console.log(response);
        toast.success("signup successful")
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
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
        className={`container ${isSignUpActive ? "right-panel-active" : ""}`}
      >
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => {
                handleChange(e);
              }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => {
                handleChange(e);
              }}
              required
            />
            <section className="siginupname">
              {" "}
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
            </section>

            <PhoneInput
              placeholder="Enter phone number"
              defaultCountry="LB"
              value={value}
             onChange={setValue}
            
            />

            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form
            action="#"
            onSubmit={() => {
              handleSignIn();
            }}
          >
            <h1>Sign in</h1>
            <div className="social-container"></div>

            <input
              type="email"
              placeholder="Email"
              name="email"
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
            <button
              onClick={() => {
                handleSignIn();
              }}
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                onClick={() => {
                  handleSignInClick();
                }}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
