import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        {/* <Route exact path="/timeline" element={} /> */}
        {/* <Route exact path="/posts/:id" element={} /> */}
        {/* <Route exact path="/users/:id" element={} /> */}
        {/* <Route exact path="/users/:id/likes" element={} /> */}
        {/* <Route exact path="/users/:id/posts" element={} /> */}
      </Routes>
    </>
  );
};

export default App;
