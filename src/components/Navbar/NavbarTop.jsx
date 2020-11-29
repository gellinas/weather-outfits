import React from "react";
import Navbar from "react-bootstrap/Navbar";
import ZipSearch from "../ZipSearch/ZipSearch.jsx";

import "./NavbarTop.scss";

function NavbarTop(props) {
  return (
    <div className="navbar-top">
      <Navbar className="navi">
        <Navbar.Brand className="nav-brand">Weathering For You</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <div className="nav-zip">
          <ZipSearch {...props} />
        </div>
      </Navbar>
    </div>
  );
}

export default NavbarTop;
