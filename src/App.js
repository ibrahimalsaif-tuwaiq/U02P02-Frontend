import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Timeline from "./components/Timeline";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Settings from "./components/Settings";
import Post from "./components/Post";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/timeline" element={<Timeline />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route exact path="/posts/:id" element={<Post />} />
        {/* <Route exact path="/users/:id" element={} /> */}
        {/* <Route exact path="/users/:id/likes" element={} /> */}
        {/* <Route exact path="/users/:id/posts" element={} /> */}
      </Routes>
    </>
  );
};

export default App;
