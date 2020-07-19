import React from 'react';
import ReactDOM from 'react-dom';
import WelcomeName from './WelcomeName';
import { BrowserRouter } from 'react-router-dom';

describe('<WelcomeName />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <BrowserRouter>
      <WelcomeName/>
      </BrowserRouter>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });