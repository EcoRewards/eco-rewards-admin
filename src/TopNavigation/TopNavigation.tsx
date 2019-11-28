import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export const TopNavigation = () => {
  return (
    <Navbar>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <NavDropdown title="Manage" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Schemes</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Organisations</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Groups</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">Members</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#reports">Reports</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
