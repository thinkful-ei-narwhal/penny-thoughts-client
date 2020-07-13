import React from 'react';
import ReactDOM from 'react-dom';
import UserSettingsPage from './UserSettingsPage';

describe('<UserSettingsPage />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <UserSettingsPage/>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });