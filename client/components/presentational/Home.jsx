import React from 'react';

import Header from './Header.jsx';
import Expose from './Expose.jsx';
import About from './About.jsx';
import Footer from './Footer.jsx';

const Home = () => [
  <Header key="header" />,
  <Expose key="expose" />,
  <About key="about" />,
  <Footer key="footer" />,
];

export default Home;
