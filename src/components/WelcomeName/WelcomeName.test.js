import React from 'react';
import ReactDOM from 'react-dom';
import WelcomeName from './WelcomeName';

describe('<WelcomeName />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <WelcomeName/>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });