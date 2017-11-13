import React from 'react';
import { Link } from 'react-router-dom';

import Nav from './../Common/Nav.jsx';
import Brand from './../Common/Brand.jsx';

/**
 * Header component
 *
 * @returns {Object} - Header component
 */
const Header = () => (
  <header>
    <div className="overlay">
      <Nav>
        <div className="container-fluid">
          <div className="nav-wrapper">
            <Brand />
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link
                  href="/sign-up"
                  to="/sign-up"
                  className="btn cta-small"
                >Get Started
                </Link>
              </li>
              <li><Link to="/sign-in" id="sign-in" href="sign-in">Sign In</Link></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
        </div>
      </Nav>
      <div className="container-fluid">
        <div className="valign-wrapper hero">
          <div>
            <p
              className="copy"
            >
              A smarter way to manage your tasks, organize your thoughts, and plan your actions
            </p>
            <Link
              href="/sign-up"
              to="/sign-up"
              className="btn btn-large animated pulse infinite"
            >Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
