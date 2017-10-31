import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Nav from './../presentational/Nav.jsx';
import Brand from './../presentational/Brand.jsx';

class Dashboard extends Component {
  render() {
    return (
      <section className="dashboard">
        <Nav>
          <div className="container-fluid">
            <div className="nav-wrapper">
              <Brand />
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link to="/notifications" href="/notifications">Notifications</Link>
                </li>
                <li>
                  <Link to="/" href="/">Sign out</Link>
                </li>
              </ul>
            </div>
          </div>
        </Nav>

        <div className="row">
          adfalfjalfdjl
        </div>
      </section>
    );
  }
}

export default Dashboard;
