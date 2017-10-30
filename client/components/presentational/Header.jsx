import React from 'react';
import { Link } from 'react-router-dom';

import Nav from './Nav.jsx';

const Header = () => (
  <header>
    <div className="overlay">
      <Nav />
      <div className="container-fluid">
        <div className="valign-wrapper hero">
          <div>
            <p
              className="copy"
            >
              A smarter way to manage your tasks, organize your thoughts, and plan your actions
            </p>
            <a href="/sign-up" className="btn btn-large animated pulse infinite">Get Started</a>
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
