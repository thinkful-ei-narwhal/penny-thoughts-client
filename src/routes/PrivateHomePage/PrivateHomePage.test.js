import React from 'react';
import ReactDOM from 'react-dom';
import PrivateHomePage from './PrivateHomePage';

describe('<PrivateHomePage />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <PrivateHomePage/>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });