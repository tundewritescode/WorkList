import React from 'react';

const Expose = () => (
  <section className="expose">
    <div className="row">
      <div className="container-fluid">
        <h5>HOW IT WORKS</h5>
        <div className="cards">
          <div className="col s12 m6 l3">
            <div className="card">
              <div className="card-image">
                <img src="images/register.jpg" alt="" height="300" />
              </div>
              <div className="card-content">
                <p>
                  Register a new account. It takes only seconds, and of course, it&apos;s free!
                </p>
              </div>
            </div>
          </div>
          <div className="col s12 m6 l3">
            <div className="card">
              <div className="card-image">
                <img src="images/to-do.jpg" alt="" height="300" />
              </div>
              <div className="card-content">
                <p>
                  Create a to-do. You can create as many as you want.
                </p>
              </div>
            </div>
          </div>
          <div className="col s12 m6 l3">
            <div className="card">
              <div className="card-image">
                <img src="images/tasks.png" alt="" height="300" />
              </div>
              <div className="card-content">
                <p>
                  Create tasks in your to-dos. Set due dates for each tasks.
                </p>
              </div>
            </div>
          </div>
          <div className="col s12 m6 l3">
            <div className="card">
              <div className="card-image">
                <img src="images/collaborators.jpg" alt="" height="300" />
              </div>
              <div className="card-content">
                <p>
                  Collaborate with other users by adding them as collaborators to your to-dos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="container-fluid">
        <p className="now">
          <a
            className="btn btn-large animated pulse infinite"
            href="/get-started"
          >Get Started Now
          </a>
        </p>
      </div>
    </div>
  </section>
);

export default Expose;
