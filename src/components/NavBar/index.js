import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./style.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    setUser(JSON.parse(userStorage));
  }, []);

  const signout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <Navbar bsclass="navbar" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <img className="logo" src="./logo.png" alt="navabr logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/timeline")}>TimeLine</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                title={user ? user.username : "User Settings"}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item onClick={() => navigate(`/`)}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate(`/profile/${user.id}`)}>Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={signout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
