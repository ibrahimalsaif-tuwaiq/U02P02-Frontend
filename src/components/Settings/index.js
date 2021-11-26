import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MdModeEditOutline } from "react-icons/md";
import NavBar from "./../NavBar";
import "./style.css";

const MySwal = withReactContent(Swal);

const BASE_URL = "http://localhost:5000";

const Settings = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const userStorage = localStorage.getItem("user");
    const userData = JSON.parse(userStorage);
    const res = await axios.get(`${BASE_URL}/users/${userData.id}`);
    setUser(res.data);
  };

  const editPassword = async () => {
    const { value: password } = await MySwal.fire({
      title: "Enter your new password",
      input: "password",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        maxlength: 10,
        autocapitalize: "off",
        autocorrect: "off",
      },
    });
    await axios
    .put(`${BASE_URL}/users/resetPassword/${user._id}`, {
      password: password,
    })
    .then(MySwal.fire("Done", "", "success"));
  };

  return (
    <>
      <NavBar />
      <div className="profileWrapper">
        <div className="profileBox">
          <div className="userInfo">
            <img
              src={
                user
                  ? user.avatar
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              }
              alt={`${user ? user.username : "user"} avatar`}
            ></img>
            <p className="userName">{user ? user.username : ""}</p>
          </div>
          <hr />
          <div className="editUser usernameInfo">
            <label>Username:</label>
            <input value={user && user.username} disabled></input>
          </div>
          <hr />
          <div className="editUser userEmailInfo">
            <label>Email:</label>
            <input value={user && user.email} disabled></input>
          </div>
          <hr />
          <div className="editUser userPasswordInfo">
            <label>Password:</label>
            <div>
              <input type="password" value={user && user.password} disabled></input>
              <MdModeEditOutline
                className="editUserIcon"
                onClick={editPassword}
              />
            </div>
          </div>
          <hr />
          <div className="editUser userBioInfo">
            <label>Bio:</label>
            <div>
              <input value={user && user.about} disabled></input>
              <MdModeEditOutline className="editUserIcon" />
            </div>
          </div>
          <hr />
          <div className="editUser userAvatarInfo">
            <label>Avatar:</label>
            <div>
              <input value={user && user.avatar} disabled></input>
              <MdModeEditOutline className="editUserIcon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
