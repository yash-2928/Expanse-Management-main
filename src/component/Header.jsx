import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "../style/Header.css";

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Nav className="mr-auto" id="nav">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
            <Nav.Link href="/report">Report</Nav.Link>     
            <Nav.Link href="/about">About</Nav.Link>     
          </Nav>
        </Navbar>
      </>
    );
  }
}

export default Header;
