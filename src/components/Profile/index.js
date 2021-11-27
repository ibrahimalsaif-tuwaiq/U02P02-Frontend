import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavBar from "./../NavBar";
import Card from "./../Card";
import "./style.css";

const BASE_URL = "https://u02p02-backend.herokuapp.com";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [follow, setFollow] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    getUsers();
    getUserPosts();
    if (user) {
      checkIfFollow();
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    checkIfFollow();
    // eslint-disable-next-line
  }, [user, userProfile]);

  const getUsers = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    if (userData) {
      const res = await axios.get(`${BASE_URL}/users/${userData.id}`);
      setUser(res.data);
    }
    const res = await axios.get(`${BASE_URL}/users/${id}`);
    setUserProfile(res.data);
  };

  const checkIfFollow = () => {
    if (user && userProfile) {
      if (user.following.find((follower) => follower === userProfile._id)) {
        setFollow(true);
      }
    }
  };

  const getUserPosts = async () => {
    const res = await axios.get(`${BASE_URL}/posts/user/${id}`);
    setUserPosts(res.data);
    setPageLoader(false);
  };

  const getUserLikes = async () => {
    const res = await axios.get(`${BASE_URL}/posts/likes/${id}`);
    setUserLikes(res.data);
    setPageLoader(false);
  };

  const followUser = async () => {
    await axios.put(`${BASE_URL}/users/followUser`, {
      userId: user._id,
      otherUserId: userProfile._id,
    });
    setFollow(true);
    getUsers();
    renderCards();
  };

  const unFollowUser = async () => {
    await axios.put(`${BASE_URL}/users/unFollowUser`, {
      userId: user._id,
      otherUserId: userProfile._id,
    });
    setFollow(false);
    getUsers();
    renderCards();
  };

  const renderCards = () => {
    getUserPosts();
    getUserLikes();
  };

  return (
    <>
      {user ? (
        userProfile && (
          <>
            <NavBar user={user} />
            <div className="profileWrapper">
              <div className="profileBox">
                <img
                  src={userProfile.avatar}
                  alt={`${userProfile.username} avatar`}
                ></img>
                <h3>{userProfile.username}</h3>
                <p>{userProfile.about}</p>
                <div className="profileInfo">
                  <div className="profileInfoItem">
                    <span className="profileInfoStats">{userPosts.length}</span>
                    <span>posts</span>
                  </div>
                  <div className="profileInfoItem">
                    <span className="profileInfoStats">
                      {userProfile.followers.length}
                    </span>
                    <span>followers</span>
                  </div>
                  <div className="profileInfoItem">
                    <span className="profileInfoStats">
                      {userProfile.following.length}
                    </span>
                    <span>following</span>
                  </div>
                </div>
                {userProfile._id === user._id ? (
                  ""
                ) : follow ? (
                  <div className="userCardFollowButton">
                    <button onClick={unFollowUser}>unfollow</button>
                  </div>
                ) : (
                  <div className="userCardFollowButton">
                    <button onClick={followUser}>follow</button>
                  </div>
                )}
              </div>
              <Box sx={{ width: "100%" }}>
                <BottomNavigation
                  showLabels
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    renderCards();
                  }}
                >
                  <BottomNavigationAction
                    label="Posts"
                    icon={<LocationOnIcon />}
                  />
                  <BottomNavigationAction
                    label="Likes"
                    icon={<FavoriteIcon />}
                  />
                </BottomNavigation>
              </Box>
              {!value ? (
                <div className="postCards">
                  {userPosts.map((card) => {
                    if (user.likes.find((post) => post._id === card._id)) {
                      if (card.creator._id === user._id)
                        return (
                          <Card
                            card={card}
                            user={user}
                            likeStatus={true}
                            deleteStatus={true}
                            render={renderCards}
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
                            render={renderCards}
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
                            render={renderCards}
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
                            render={renderCards}
                            key={card._id}
                          />
                        );
                    }
                  })}
                </div>
              ) : (
                <div className="postCards">
                  {userLikes.map((card) => {
                    if (user.likes.find((post) => post._id === card._id)) {
                      if (card.creator._id === user._id)
                        return (
                          <Card
                            card={card}
                            user={user}
                            likeStatus={true}
                            deleteStatus={true}
                            render={renderCards}
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
                            render={renderCards}
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
                            render={renderCards}
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
                            render={renderCards}
                            key={card._id}
                          />
                        );
                    }
                  })}
                </div>
              )}
            </div>
          </>
        )
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

export default Profile;
