import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IoLocationSharp } from "react-icons/io5";
import { BsTrashFill } from "react-icons/bs";
import { MdOutlineComment, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import "./style.css";

const MySwal = withReactContent(Swal);

const BASE_URL = "http://localhost:5000";

const Card = ({ card, likeStatus, deleteStatus, render }) => {
  const navigate = useNavigate();
  const [like, setLike] = useState(likeStatus);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);

  const getUserData = () => {
    const userStorage = localStorage.getItem("user");
    setUserData(JSON.parse(userStorage));
  };

  const likePost = async () => {
    setLike(true);
    await axios.put(`${BASE_URL}/posts/addLike`, {
      userId: userData.id,
      postId: card._id,
    });
    render();
  };

  const deleteLikedPost = async () => {
    setLike(false);
    await axios.put(`${BASE_URL}/posts/deleteLike`, {
      userId: userData.id,
      postId: card._id,
    });
    render();
  };

  const deletePost = async () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "#D11A2A",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#D11A2A",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.put(`${BASE_URL}/posts/${card._id}`);
        render();
        MySwal.fire({
          title: "Deleted!",
          text: "Your post has been deleted",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#2A1DD1",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Your post is safe :)",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "#2A1DD1",
        });
      }
    });
  };

  return (
    <div className="card">
      <div className="cardHeader">
        <div className="cardLocation">
          <IoLocationSharp className="locationIcon" />
          <h6>{card.location}</h6>
        </div>
        {deleteStatus && (
          <BsTrashFill className="deleteIcon" onClick={deletePost} />
        )}
      </div>
      <img
        className="cardImage"
        src={card.image}
        alt={`${card.location} post`}
      ></img>
      <div className="cardFooter">
        <div className="cardStatus">
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
          <button onClick={() => navigate(`/posts/${card._id}`)}>VIEW</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
