import React from 'react';
import ReactDOM from 'react-dom';
import SingleMessage from './SingleMessage';

describe('<SingleMessage />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <SingleMessage/>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });