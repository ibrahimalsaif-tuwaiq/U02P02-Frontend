import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineComment, MdFavorite } from "react-icons/md";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import NavBar from "./../NavBar";
import "./style.css";

const BASE_URL = "https://u02p02-backend.herokuapp.com";

const Post = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [userPost, setUserPost] = useState(0);
  const [like, setLike] = useState(false);
  const [follow, setFollow] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line
  }, []);

  const getUserDetails = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    if (userData) {
      const res = await axios.get(`${BASE_URL}/users/${userData.id}`);
      setUser(res.data);
      getPost(res.data);
      getUserPosts(res.data);
    }
  };

  const getPost = async (user) => {
    const res = await axios.get(`${BASE_URL}/posts/${id}`);
    setPost(res.data);
    if (user.likes.find((post) => post._id === res.data._id)) {
      setLike(true);
    }
    if (user.following.find((follower) => follower === res.data.creator._id)) {
      setFollow(true);
    }
    setPageLoader(false);
  };

  const getUserPosts = async (user) => {
    const res = await axios.get(`${BASE_URL}/posts/user/${user._id}`);
    setUserPost(res.data.length);
  };

  const likePost = async () => {
    setLike(true);
    await axios.put(`${BASE_URL}/posts/addLike`, {
      userId: user._id,
      postId: post._id,
    });
    getUserDetails();
  };

  const deleteLikedPost = async () => {
    setLike(false);
    await axios.put(`${BASE_URL}/posts/deleteLike`, {
      userId: user._id,
      postId: post._id,
    });
    getUserDetails();
  };

  const followUser = async () => {
    await axios.put(`${BASE_URL}/users/followUser`, {
      userId: user._id,
      otherUserId: post.creator._id,
    });
    setFollow(true);
    getUserDetails();
  };

  const unFollowUser = async () => {
    await axios.put(`${BASE_URL}/users/unFollowUser`, {
      userId: user._id,
      otherUserId: post.creator._id,
    });
    setFollow(false);
    getUserDetails();
  };

  const addcomment = async () => {
    const comment = document.getElementById("shareCommentText").value;
    if (comment.trim().length > 0) {
      await axios.post(`${BASE_URL}/posts/addComment`, {
        comment: comment,
        postedBy: user._id,
        postId: post._id,
      });
      getUserDetails();
    }
  };

  return (
    <>
      {user ? (
        post && (
          <>
            <NavBar user={user} />
            <div className="postWrapper">
              <Container>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <Col lg={7}>
                    <div className="postCard">
                      <img src={post.image} alt={`${post.location}`}></img>
                      <p className="postLocation">
                        <IoLocationSharp className="postlocationIcon" />
                        {post.location}
                      </p>
                      <div className="postStatus">
                        {like ? (
                          <MdFavorite
                            className="likeIcon"
                            onClick={deleteLikedPost}
                          />
                        ) : (
                          <MdFavorite
                            className="unLikeIcon"
                            onClick={likePost}
                          />
                        )}
                        <span>{post.likes.length}</span>
                        <MdOutlineComment className="commentIcon" />
                        <span>{post.comments.length}</span>
                      </div>
                      <p className="postCaption">{post.caption}</p>
                      <h4 className="commentsTitle">Comments</h4>
                      <div className="shareCommentContainer">
                        <div className="shareCommentUser">
                          <img
                            src={user.avatar}
                            alt={`${user.username} avatar`}
                          ></img>
                          <p>{user.username}</p>
                        </div>
                        <textarea
                          id="shareCommentText"
                          placeholder="Write a comment.."
                        ></textarea>
                        <button
                          className="shareCommentButton"
                          onClick={addcomment}
                        >
                          Share
                        </button>
                      </div>
                      <ul className="commentsWrapper">
                        {post &&
                          post.comments.map((comment, index) => {
                            return (
                              <li className="commentBox" key={index}>
                                <div className="commentBoxUser">
                                  <img
                                    src={comment.postedBy.avatar}
                                    alt={`${comment.postedBy.username} avatar`}
                                    onClick={() => navigate(`/users/${comment.postedBy._id}`)}
                                  ></img>
                                  <p onClick={() => navigate(`/users/${comment.postedBy._id}`)}>{comment.postedBy.username}</p>
                                </div>
                                <h6>{comment.comment}</h6>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="userCard">
                      <img
                        src={post.creator.avatar}
                        alt={`${post.creator.username} avatar`}
                        className="userCardImage"
                        onClick={() => navigate(`/users/${post.creator._id}`)}
                      />
                      <div className="userCardUsername">
                        <h2 onClick={() => navigate(`/users/${post.creator._id}`)}>{post.creator.username}</h2>
                      </div>
                      <div className="userCardInfo">
                        <div className="userCardInfoItem">
                          <span className="userCardStats">{userPost}</span>
                          <span>posts</span>
                        </div>
                        <div className="userCardInfoItem">
                          <span className="userCardStats">
                            {post.creator.followers.length}
                          </span>
                          <span>followers</span>
                        </div>
                        <div className="userCardInfoItem">
                          <span className="userCardStats">
                            {post.creator.following.length}
                          </span>
                          <span>following</span>
                        </div>
                      </div>
                      {post.creator._id === user._id ? (
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
                  </Col>
                </Row>
              </Container>
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

export default Post;
