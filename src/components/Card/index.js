import React from "react";
import axios from "axios";
import NavBar from "./../NavBar";
import "./style.css";

const BASE_URL = "http://localhost:5000";

const Home = () => {

  const sendPost = async () => {
    const res = await axios.post(`${BASE_URL}/posts`, {
      image: 'identifier',
      location: "ghsssf, Saudi Arabia",
      creator: 'password',
    });
    console.log(res.data);
  };

  return (
    <div>
      <NavBar/>

    </div>
  );
};

export default Home;
