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
  const [hover, setHover] = useState(false);
  console.log(likeStatus);

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

  const toggleHover = () => {
    setHover(!hover);
  };

  let WrapperStyle;
  if (hover) {
    WrapperStyle = {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${card.image})`,
    };
  } else {
    WrapperStyle = {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${card.image})`,
    };
  }

  return (
    <div className="card">
      <div className="wrapper" style={WrapperStyle} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
        <div className="header">
          <div className="delete">
            {deleteStatus && (
              <BsTrashFill className="deleteIcon icon" onClick={deletePost} />
            )}
          </div>
          <ul className="menu-content">
            <li>
              {like ? (
                <MdFavorite className="likeIcon icon" onClick={deleteLikedPost} />
              ) : (
                <MdFavorite className="unLikeIcon icon" onClick={likePost} />
              )}
              <span>{card.likes.length}</span>
            </li>
            <li>
              <MdOutlineComment className="commentIcon icon" />
              <span>{card.comments.length}</span>
            </li>
          </ul>
        </div>
        <div className="data">
          <div className="content">
            <h1 className="location">
              <IoLocationSharp className="locationIcon" />
              {card.location}
            </h1>
            <a
              href="#"
              className="view"
              onClick={() => navigate(`/posts/${card._id}`)}
            >
              VIEW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
