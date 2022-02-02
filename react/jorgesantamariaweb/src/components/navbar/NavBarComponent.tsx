import React from "react";
import "./navbar.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBarComponent: React.FunctionComponent = () => {
  return (
    <div className="navbar-nav alignNav">
      <Nav defaultActiveKey="/">
        <Navbar variant="dark" expand="lg">
          <Container>
            <Link to="/" className="navbar-brand">
              JS
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
                <Link to="/experience" className="nav-link">
                  Experience
                </Link>
                <Link to="/projects" className="nav-link">
                  Projects
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Nav>
    </div>
  );
};

export default NavBarComponent;
