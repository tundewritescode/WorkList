import React from 'react';
import { render } from 'react-dom';
import 'materialize-css/dist/js/materialize';

import Routes from './routes/Routes.jsx';
import './style/style.scss';

render(<Routes />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
