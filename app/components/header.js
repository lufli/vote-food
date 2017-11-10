import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="nav-bar">
      <ul className="navigation">
        <li><Link to="/vote">Vote</Link></li>
        <li><Link to="/result">Result</Link></li>
        <li><Link to="/restaurant">Restaurant</Link></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  )
}

export default Header;