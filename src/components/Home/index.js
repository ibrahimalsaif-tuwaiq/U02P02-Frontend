import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "./../firebase";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AiOutlinePlus } from "react-icons/ai";
import NavBar from "./../NavBar";
import Card from "./../Card";
import "./style.css";

const MySwal = withReactContent(Swal);

const BASE_URL = "http://localhost:5000";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [postCards, setPostCards] = useState([]);
  const [pageLoader, setPageLoader] = useState(true);
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    getUserDetails();
    getPosts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      url.trim().length > 0 &&
      location.trim().length > 0 &&
      caption.trim().length > 0
    ) {
      addPost();
      setUrl("");
      setLocation("");
      setCaption("");
    }
    // eslint-disable-next-line
  }, [caption]);

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

  const handleUpload = (image) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  const getPostData = async () => {
    const { value: file } = await MySwal.fire({
      title: "Add New Post",
      input: "file",
      inputLabel: "Chose your image",
      showCancelButton: true,
      confirmButtonText: "Next",
      confirmButtonColor: "#457B9D",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });
    handleUpload(file);
    if (file) {
      const { value: formValues } = await MySwal.fire({
        title: "Add New Post",
        showCancelButton: true,
        confirmButtonText: "Next",
        confirmButtonColor: "#457B9D",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="City">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Country">',
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value,
          ];
        },
      });
      setLocation(`${formValues[0]}, ${formValues[1]}`);

      if (formValues) {
        const { value: text } = await MySwal.fire({
          title: "Add New Post",
          input: "textarea",
          inputPlaceholder: "Type your caption here...",
          inputAttributes: {
            "aria-label": "Type your caption here",
          },
          showCancelButton: true,
          confirmButtonText: "Post",
          confirmButtonColor: "#1D3557",
          cancelButtonText: "Cancel",
          reverseButtons: true,
        });
        setCaption(text);
      }
    }
  };

  const addPost = async () => {
    await axios.post(`${BASE_URL}/posts`, {
      image: url,
      location: location,
      caption: caption,
      creator: user._id,
    });
    getPosts();
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
          <button id="fixedbutton" onClick={getPostData}>
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
