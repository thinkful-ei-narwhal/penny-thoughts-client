import React from 'react';
import ReactDOM from 'react-dom';
import NewThinkingLoader from './NewThinkingLoader';

describe('<NewThinkingLoader />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <NewThinkingLoader/>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });