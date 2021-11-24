import React from "react";
// import axios from "axios";
import "./style.css";

// const BASE_URL = "http://localhost:5000";

const Cards = () => {
  // const sendPost = async () => {
  //   const res = await axios.post(`${BASE_URL}/posts`, {
  //     image: 'identifier',
  //     location: "ghsssf, Saudi Arabia",
  //     creator: 'password',
  //   });
  //   console.log(res.data);
  // };

  return (
    <div class="cards-list">
      <div class="card 1">
        <div class="card_image">
          <img src="https://i.redd.it/b3esnz5ra34y.jpg" />
        </div>
      </div>
      <div class="card 2">
        <div class="card_image">
          <img src="https://cdn.blackmilkclothing.com/media/wysiwyg/Wallpapers/PhoneWallpapers_FloralCoral.jpg" />
        </div>
      </div>
      <div class="card 3">
        <div class="card_image">
          <img src="https://media.giphy.com/media/10SvWCbt1ytWCc/giphy.gif" />
        </div>
      </div>

      <div class="card 4">
        <div class="card_image">
          <img src="https://media.giphy.com/media/LwIyvaNcnzsD6/giphy.gif" />
        </div>
      </div>
    </div>
  );
};

export default Cards;
