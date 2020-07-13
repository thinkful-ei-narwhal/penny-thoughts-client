import React from 'react';
import ReactDOM from 'react-dom';
import PublicHomePage from './PublicHomePage';

describe('<PublicHomePage />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <PublicHomePage/>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });