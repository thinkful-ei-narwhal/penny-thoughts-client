import React from 'react';
import ReactDOM from 'react-dom';
import UserMessage from './UserMessage';

describe('<UserMessage />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <UserMessage/>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });