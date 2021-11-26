import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./../NavBar";
import Card from "./../Card";

const BASE_URL = "http://localhost:5000";

const Timeline = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [postCards, setPostCards] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);

  useEffect(() => {
    getUserDetails();
    getUserFollowing();
    // eslint-disable-next-line
  }, []);

  const getUserDetails = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    if (userData) {
      const res = await axios.get(`${BASE_URL}/users/${userData.id}`);
      setUser(res.data);
    }
  };

  const getUserFollowing = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    const res = await axios.get(`${BASE_URL}/users/${userData.id}`);
    getPosts(userData.id, res.data.following);
  };

  const getPosts = async (userId, followingList) => {
    const res = await axios.put(`${BASE_URL}/posts/followingPosts/${userId}`, {
      userFollowing: followingList,
    });
    setPostCards(res.data);
    setPageLoader(false);
  };

  return (
    <>
      {user ? (
        <>
          <NavBar user={user} />
          <div className="cards">
            {postCards.map((card) => {
              if (user.likes.find((post) => post._id === card._id)) {
                if (card.creator._id === user._id)
                  return (
                    <Card
                      card={card}
                      user={user}
                      likeStatus={true}
                      deleteStatus={true}
                      render={getUserFollowing}
                      key={card._id}
                    />
                  );
                else
                  return (
                    <Card
                      card={card}
                      user={user}
                      likeStatus={true}
                      deleteStatus={false}
                      render={getUserFollowing}
                      key={card._id}
                    />
                  );
              } else {
                if (card.creator._id === user._id)
                  return (
                    <Card
                      card={card}
                      user={user}
                      likeStatus={false}
                      deleteStatus={true}
                      render={getUserFollowing}
                      key={card._id}
                    />
                  );
                else
                  return (
                    <Card
                      card={card}
                      user={user}
                      likeStatus={false}
                      deleteStatus={false}
                      render={getUserFollowing}
                      key={card._id}
                    />
                  );
              }
            })}
          </div>
        </>
      ) : pageLoader ? (
        <div className="centerWrapper">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className="centerWrapper">
          <div className="signupLoginTitle">
            <h1>YOU HAVE TO LOGIN FIRST</h1>
          </div>
          <div className="signupLoginButtons">
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Signup</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Timeline;
