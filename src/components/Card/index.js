import React from "react";
import "./style.css";

const Card = ({ card }) => {
  return (
    <div className="card">
      <div className="postHeader">
        <div className="userAvatar">
          <img
            src={card.creator.avatar}
            alt={`${card.creator.username} avatar`}
          ></img>
        </div>
        <div className="userName">
          <p>{card.creator.username}</p>
        </div>
      </div>
      <img
        className="postImage"
        src={card.image}
        alt={`${card.creator.username} post`}
      ></img>
      <div className="status">
        <div className="likeComment">
          <img
            src="https://cdn4.iconfinder.com/data/icons/app-custom-ui-1/48/Heart-128.png"
            alt="like icon"
          ></img>
          <p>{card.likes.length}</p>
          <img
            src="https://cdn4.iconfinder.com/data/icons/app-custom-ui-1/48/Chat_bubble-128.png"
            alt="comment icon"
          ></img>
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
