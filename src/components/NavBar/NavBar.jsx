import React from "react";
import styles from "./NavBar.module.scss";
import Link from "react-router-dom/Link";
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const NavBar = (props) => {
  const {checkActive} = props;

  return (
    <Navbar
      id="#navbarNav" 
      className={`${styles.navMain} `}
      collapseOnSelect
      expand="md"
      variant="dark"
    >
        <Container className="dflex justify-content-between">
          <Navbar.Brand href="/">
            Stechford Allotments
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse 
            className="justify-content-end"
            id="navbarNav"
          >
            <Nav>
              <NavLink
                checkActive={checkActive("/")}
                path="/" 
                linkText="Home" 
              />
              <NavLink
                checkActive={checkActive("/about")}
                path="/about"
                linkText="About"
              />
              <NavLink
                checkActive={checkActive("/articles")}
                path="/articles"
                linkText="Articles"
              />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

function NavLink(props) {
  const {checkActive, linkText, path} = props;

  return (
    <Nav.Item className={`p-1 ml-2 rounded ${styles.navbarLink} ${styles.navHover}`}>
      <Nav.Link
        active={checkActive}
        as={Link}
        // className="nav-link"
        to={path}
      >
        {linkText}
      </Nav.Link>
      {/* <Link
        className="nav-link"
        to={link}
      >
        {linkText}
      </Link> */}
    </Nav.Item>
  );
};

export default NavBar;
