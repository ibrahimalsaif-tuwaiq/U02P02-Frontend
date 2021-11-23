import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Landing = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  return (
    <div className="landingPageWrapper">
      <h1>Welcome to travellers</h1>
      {user ? (
        <div className="userButtons">
          <div className="landingButton" id="homeButton">
            <Link to="/home">home</Link>
          </div>
        </div>
      ) : (
        <div className="notUserButtons">
          <div className="landingButton" id="signupButton">
            <Link to="/signup">signup</Link>
          </div>
          <div className="landingButton" id="loginButton">
            <Link to="/login">login</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
