import React from 'react';

import Header from './Header.jsx';
import Expose from './Expose.jsx';
import About from './About.jsx';

/**
 * Home
 *
 * @returns {Array} - Array of components constituting the homepage
 */
const Home = () => [
  <Header key="header" />,
  <Expose key="expose" />,
  <About key="about" />,
];

export default Home;
