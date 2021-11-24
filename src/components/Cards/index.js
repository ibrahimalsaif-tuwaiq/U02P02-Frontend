import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./../Card";
import "./style.css";

const BASE_URL = "http://localhost:5000";

const Cards = () => {
  const [postCards, setPostCards] = useState([]);

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  const getPosts = async () => {
    const res = await axios.get(`${BASE_URL}/posts`);
    setPostCards(res.data);
  };

  return (
    <div className="cards">
      {postCards.map((card) => {
        return <Card card={card} key={card._id}/>;
      })}
    </div>
  );
};

export default Cards;
