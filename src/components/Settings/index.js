import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "./../firebase";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MdModeEditOutline } from "react-icons/md";
import TextField from "@mui/material/TextField";
import NavBar from "./../NavBar";
import "./style.css";

const MySwal = withReactContent(Swal);

const BASE_URL = "http://localhost:5000";

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState("");
  const [pageLoader, setPageLoader] = useState(true);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (url.trim().length > 0) {
      updateAvatar();
    }
    // eslint-disable-next-line
  }, [url]);


  const getUser = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    const res = await axios.get(`${BASE_URL}/users/${userData.id}`);
    setUser(res.data);
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

  const resetPassword = async () => {
    const { value: password } = await MySwal.fire({
      title: "Reset Password",
      input: "password",
      inputPlaceholder: "Your new Password",
      showCancelButton: true,
      confirmButtonText: "Reset",
      confirmButtonColor: "#1D3557",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
    });

    if (password) {
      await axios.put(`${BASE_URL}/users/resetPassword/${user._id}`, {
        password: password,
      });
      MySwal.fire("Done", "", "success");
    }
    getUser();
  };

  const editBio = async () => {
    const { value: bio } = await MySwal.fire({
      title: "New Bio",
      input: "textarea",
      inputPlaceholder: "Enter your new Bio",
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#1D3557",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (bio) {
      await axios.put(`${BASE_URL}/users/changeAbout/${user._id}`, {
        about: bio,
      });
      MySwal.fire("Done", "", "success");
      getUser();
    }
  };

  const editAvatar = async () => {
    const { value: file } = await MySwal.fire({
      title: "New Avatar",
      input: "file",
      inputLabel: "Chose your image",
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#1D3557",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      handleUpload(file);
    }
  };

  const updateAvatar = async () => {
    await axios.put(`${BASE_URL}/users/changeAvatar/${user._id}`, {
      avatar: url,
    });
    MySwal.fire("Done", "", "success");
    getUser();
  };

  return (
    <>
      {user ? (
        <>
          <NavBar user={user} />
          <div className="settingsWrapper">
            <div className="settingsProfileBox">
              <div className="settingsUserInfo">
                <img src={user.avatar} alt={`${user.username} avatar`}></img>
                <p className="userName">{user.username}</p>
              </div>
              <div className="UserSettings">
                <div className="UserSettingItem">
                  <TextField
                    disabled
                    className="labelItem"
                    label="Username"
                    defaultValue={user.username}
                  />
                </div>
                <div className="UserSettingItem">
                  <TextField
                    disabled
                    className="labelItem"
                    label="Email"
                    defaultValue={user.email}
                  />
                </div>
                <div className="UserSettingItem">
                  <TextField
                    disabled
                    className="labelItem"
                    label="Password"
                    type="password"
                    defaultValue={user.password}
                  />
                  <MdModeEditOutline
                    className="editUserIcon"
                    onClick={resetPassword}
                  />
                </div>
                <div className="UserSettingItem">
                  <TextField
                    disabled
                    className="labelItem"
                    label="Bio"
                    defaultValue={user.about}
                  />
                  <MdModeEditOutline
                    className="editUserIcon"
                    onClick={editBio}
                  />
                </div>
                <div className="UserSettingItem">
                  <TextField
                    disabled
                    className="labelItem"
                    label="Avatar"
                    defaultValue={user.avatar}
                  />
                  <MdModeEditOutline
                    className="editUserIcon"
                    onClick={editAvatar}
                  />
                </div>
              </div>
            </div>
          </div>
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

export default Settings;
