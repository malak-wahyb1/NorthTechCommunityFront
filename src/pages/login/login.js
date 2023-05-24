import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { storeUser } from "../../redux/reducer";
import { storeToken } from "../../redux/reducer";
function LoginPage() {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
 
  const [signUp, setSignUp] = useState([]);
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
      .post(`http://localhost:5000/user/login`, { email, password })
      .then((response) => {
        navigate(home);

        const user = response.data.user;
        dispatch(storeUser(user));
        dispatch(storeToken(response.data.token));
      })
      .catch((error) => {
        console.log(error);
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
  const handleChange = (e) => {
    setSignUp((prevSignUp) => ({
      ...prevSignUp,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(signUp);
    axios
      .post(`http://localhost:5000/user`, signUp )
      .then((response) => {
        console.log(response.data.message);
        if (response.data.token) { 
          const user1 = response.data.message;
          dispatch(storeUser(user1));
          dispatch(storeToken(response.data.token));
        }
        
        toast.error(response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((error) => {
        console.log(error);
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
            
              onChange={(newValue) => {
                setSignUp((prevSignUp) => ({
                  ...prevSignUp,
                  phone: newValue,
                }));
              }}
            />

            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={(e) => handleSignIn(e)}>
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
            <button type="submit">Sign In</button>
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
