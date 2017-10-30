import React from 'react';
import { render } from 'react-dom';

import Root from './components/Root.jsx';
import './style/style.scss';

render(<Root />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
