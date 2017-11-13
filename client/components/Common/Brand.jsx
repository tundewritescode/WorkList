import React from 'react';

import { Link } from 'react-router-dom';

/**
 * Brand
 *
 * @returns {Object} - Brand Component
 */
const Brand = () => (
  <Link href="/" to="/" className="brand-logo">
    <span className="purple">Work</span>
    <span className="white">List</span>
  </Link>
);

export default Brand;
