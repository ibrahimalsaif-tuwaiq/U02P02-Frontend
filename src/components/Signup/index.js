import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const BASE_URL = "https://u02p02-backend.herokuapp.com";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  const signup = async () => {
    setMessage("");
    const res = await axios.post(`${BASE_URL}/signup`, {
      username: username,
      email: email,
      password: password,
    });
    if (res.data.message === "Signup success!") {
      navigate("/login");
    } else {
      setMessage(res.data.message);
    }
  };

  return (
    <div className="signupWrapper">
      {user ? (
        <h1>
          <div className="centerWrapper">
            <div className="homeSignupTitle">
              <h1>You already loggedin, you don't need to signup</h1>
            </div>
            <div className="homeSignupButtons">
              <button onClick={() => navigate("/home")}>home</button>
            </div>
          </div>
        </h1>
      ) : (
        <main className="signupPanel">
          <div className="signupPanel__half signupHalf--first">
            <h2>Hello, friend!</h2>
            <p>If you are already registered, login now</p>
            <button id="loginButton" onClick={() => navigate("/login")}>
              login
            </button>
          </div>
          <div className="signupPanel__half signupHalf--second">
            <h2>Signup</h2>
            {message ? <div className="message">{message}</div> : ""}
            <form
              className="signupInput"
              onSubmit={(e) => {
                e.preventDefault();
                signup(e);
              }}
            >
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input id="signupSubmitButton" type="submit" value="Submit" />
            </form>
          </div>
        </main>
      )}
    </div>
  );
};

export default Signup;
