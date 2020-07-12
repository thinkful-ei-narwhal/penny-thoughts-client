import React from 'react';
import ReactDOM from 'react-dom';
import UserMessageList from './UserMessageList';

describe('<UserMessageList />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <UserMessageList/>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });