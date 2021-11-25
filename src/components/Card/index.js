import React, { useState } from "react";
import axios from "axios";
import { IoLocationSharp } from "react-icons/io5";
import { BsTrashFill } from "react-icons/bs";
import { MdOutlineComment, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import "./style.css";

const BASE_URL = "http://localhost:5000";

const Card = ({ card, likeState, deleteState }) => {
  const [like, setLike] = useState(likeState);
  const [deleteIcon, setDeleteIcon] = useState(deleteState);

  const likePost = async () => {
    console.log('like');
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    await axios.put(`${BASE_URL}/posts/addLike`, {
      userId: userData.id,
      postId: card._id,
    });
    setLike(true);
  };

  const deleteLikedPost = async () => {
    console.log('delete like');
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    await axios.put(`${BASE_URL}/posts/deleteLike`, {
      userId: userData.id,
      postId: card._id,
    });
    setLike(false);
  };

  const deletePost = async () => {
    console.log('delete post');
    await axios.put(`${BASE_URL}/posts/${card._id}`);
  };

  return (
    <div className="card">
      <div className="postLocation">
        <IoLocationSharp className="locationIcon" />
        <h6>{card.location}</h6>
        {deleteIcon && <BsTrashFill onClick={deletePost} />}
      </div>
      <img
        className="postImage"
        src={card.image}
        alt={`${card.location} post`}
      ></img>
      <div className="status">
        <div className="likeComment">
          {like ? (
            <MdFavorite className="likeIcon" onClick={deleteLikedPost} />
          ) : (
            <MdFavoriteBorder className="unLikeIcon" onClick={likePost} />
          )}
          <p>{card.likes.length}</p>
          <MdOutlineComment className="commentIcon" />
          <p>{card.comments.length}</p>
        </div>
        <div className="viewPost">
          <button>VIEW</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
