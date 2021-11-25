import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./../NavBar";
import Card from "./../Card";
import "./style.css";

const BASE_URL = "http://localhost:5000";

const Timeline = () => {
  const [postCards, setPostCards] = useState([]);

  useEffect(() => {
    getUserFollowing();
    // eslint-disable-next-line
  }, []);

  const getPosts = async (following) => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    const res = await axios.put(`${BASE_URL}/posts/followingPosts/${userData.id}`, {
      userFollowing: following
    });
    setPostCards(res.data);
  };

  const getUserFollowing = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    const res = await axios.get(`${BASE_URL}/users/${userData.id}`);
    getPosts(res.data.following);
  };

  return (
    <div>
      <NavBar />
      <div className="cards">
      {postCards.map((card) => {
        return <Card card={card} key={card._id}/>;
      })}
    </div>
    </div>
  );
};

export default Timeline;
