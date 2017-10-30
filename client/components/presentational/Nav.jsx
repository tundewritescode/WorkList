import React from 'react';

const Nav = () => (
  <nav>
    <div className="container-fluid">
      <div className="nav-wrapper">
        <a href="/home" className="brand-logo">
          <span className="purple">Work</span>
          <span className="white">List</span>
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a className="cta-small btn" href="sass.html">Get Started</a></li>
          <li><a href="badges.html">Sign In</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Nav;
