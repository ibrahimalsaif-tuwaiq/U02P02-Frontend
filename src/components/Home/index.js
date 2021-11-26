import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./../NavBar";
import Card from "./../Card";
import { AiOutlinePlus } from "react-icons/ai";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./style.css";

const MySwal = withReactContent(Swal);

const BASE_URL = "http://localhost:5000";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [postCards, setPostCards] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);

  useEffect(() => {
    getUserDetails();
    getPosts();
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

  const getPosts = async () => {
    const res = await axios.get(`${BASE_URL}/posts`);
    setPostCards(res.data);
    setPageLoader(false);
  };

  const addPost = () => {
    MySwal.fire({
      title: "Add New Post",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Image link">' +
        '<input id="swal-input2" class="swal2-input" placeholder="City">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Country">',
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
        ];
      },
    }).then(async (formValues) => {
      await axios
        .post(`${BASE_URL}/posts`, {
          image: formValues.value[0],
          location: `${formValues.value[1]}, ${formValues.value[2]}`,
          creator: user._id,
        })
        .then(MySwal.fire("Done", "", "success"));
      // .catch(MySwal.fire("Oops Somthing went wrong", "", "error"));
    });
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
                      render={getPosts}
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
                      render={getPosts}
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
                      render={getPosts}
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
                      render={getPosts}
                      key={card._id}
                    />
                  );
              }
            })}
          </div>
          <button id="fixedbutton" onClick={addPost}>
            <AiOutlinePlus />
          </button>
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

export default Home;
