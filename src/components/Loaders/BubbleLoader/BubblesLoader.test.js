import React from 'react';
import ReactDOM from 'react-dom';
import BubblesLoader from './BubblesLoader';

describe('<BubblesLoader />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <BubblesLoader/>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });