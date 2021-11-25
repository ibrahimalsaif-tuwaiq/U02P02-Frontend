import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { BsTrashFill } from "react-icons/bs";
import { MdOutlineComment, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import NavBar from "./../NavBar";
import "./style.css";

const BASE_URL = "http://localhost:5000";

const Post = () => {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [like, setLike] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getUser();
    getPost();
  }, []);

  const getUser = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    const res = await axios.get(`${BASE_URL}/users/${userData.id}`);
    setUser(res.data);
  };

  const getPost = async () => {
    const res = await axios.get(`${BASE_URL}/posts/${id}`);
    setPost(res.data);
    if (user && user.likes.find((post) => post._id === res.data._id)) {
      setLike(true);
    }
  };

  return (
    <>
      <NavBar />
      <div className="postWrapper">
        <Container>
          <Row>
            <Col md={8}>
              <div className="postCard">
                <img src={post && post.image} className="postIamge"></img>
                <p>{post && post.location}</p>
                <p>{post && post.caption}</p>
                <div className="status">
                  <div className="likeComment">
                    {like ? (
                      <MdFavorite
                        className="likeIcon"
                        // onClick={deleteLikedPost}
                      />
                    ) : (
                      <MdFavoriteBorder
                        className="unLikeIcon"
                        // onClick={likePost}
                      />
                    )}
                    <p>{post && post.likes.length}</p>
                    <MdOutlineComment className="commentIcon" />
                    <p>{post && post.comments.length}</p>
                  </div>
                </div>
                <ul>
                {post && post.comments.map( comment => {
                  return <li>{comment.postedBy.avatar}</li>
                })}
                </ul>
              </div>
            </Col>
            <Col md={4}>
              <div className="userCard">
                <img src={post && post.creator.avatar}></img>
                <p>{post && post.creator.username}</p>
                <p>{post && post.creator.following.length}</p>
                <p>{post && post.creator.followers.length}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Post;
