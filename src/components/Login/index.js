import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const BASE_URL = "http://localhost:5000";

const Login = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  const login = async () => {
    setMessage("");
    const res = await axios.post(`${BASE_URL}/login`, {
      identifier: identifier,
      password: password,
    });
    if (typeof res.data === "object") {
      localStorage.setItem(
        "user",
        JSON.stringify({ id: res.data._id, username: res.data.username })
      );
      navigate("/home");
    } else {
      setMessage(res.data);
    }
  };

  return (
    <div className="loginWrapper">
      {user ? (
        <>
          <div className="centerWrapper">
            <div className="homeTitle">
              <h1>You already loggedin, you don't need to login</h1>
            </div>
            <div className="homeButtons">
              <button onClick={() => navigate("/home")}>home</button>
            </div>
          </div>
        </>
      ) : (
        <main className="panel">
          <div className="panel__half half--first">
            <h2>Login</h2>
            {message ? <div className="message">{message}</div> : ""}
            <form
              className="input"
              onSubmit={(e) => {
                e.preventDefault();
                login(e);
              }}
            >
              <input
                type="text"
                placeholder="Email/Username"
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input id="submitButton" type="submit" value="Submit" />
            </form>
          </div>
          <div className="panel__half half--second">
            <h2>Hello, friend!</h2>
            <p>Enter your personal details and start your journey with us</p>
            <button id="signupButton" onClick={() => navigate("/signup")}>
              Sign up
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default Login;
