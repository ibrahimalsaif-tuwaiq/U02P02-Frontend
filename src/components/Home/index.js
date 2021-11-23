import React from "react";
import axios from "axios";
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
      <form onSubmit={sendPost} enctype="multipart/form-data">
        <input type="file" accept="image/png, image/jpeg, image/jpg" />
      </form>
    </div>
  );
};

export default Home;
