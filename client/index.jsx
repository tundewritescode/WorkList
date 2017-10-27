import React from 'react';
import { render } from 'react-dom';

const Hi = () => (
  <h1>Hi WorkList 2</h1>
);

render(<Hi />, document.getElementById('root'));


if (module.hot) {
  module.hot.accept();
}
