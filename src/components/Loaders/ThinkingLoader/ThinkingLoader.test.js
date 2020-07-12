import React from 'react';
import ReactDOM from 'react-dom';
import ThinkingLoader from './ThinkingLoader';

describe('<ThinkingLoader />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <ThinkingLoader/>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });