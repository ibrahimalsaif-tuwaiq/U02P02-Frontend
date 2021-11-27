import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Landing = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  return (
    <div className="landingPageWrapper">
      <img className="logoLanding" src="/logo.png" alt="website logo" />
      {user ? (
        <div className="userButtons">
          <div className="landingButton">
            <button onClick={() => navigate("/home")}>home</button>
          </div>
        </div>
      ) : (
        <div className="notUserButtons">
          <div className="landingButton">
            <button onClick={() => navigate("/signup")}>signup</button>
          </div>
          <div className="landingButton">
            <button onClick={() => navigate("/login")}>login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
